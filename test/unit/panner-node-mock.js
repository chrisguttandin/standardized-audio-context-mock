import { AudioContext, PannerNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { PannerNodeMock } from '../../src/panner-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('PannerNodeMock', () => {
    let audioContextMock;
    let pannerNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        pannerNodeMock = new PannerNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the PannerNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const pannerNode = new PannerNode(audioContext);

        for (const key of getAllKeys(pannerNode)) {
            const property = pannerNode[key];

            if (property === audioContext) {
                expect(pannerNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(pannerNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(pannerNodeMock[key]).to.be.a('function');
            } else {
                expect(pannerNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'PannerNode')).to.deep.equal([pannerNodeMock]);
    });

    describe('AudioParam properties', () => {
        const audioParamProperties = ['positionX', 'positionY', 'positionZ', 'orientationX', 'orientationY', 'orientationZ'];

        audioParamProperties.forEach((prop) => {
            it(`should have an AudioParam for ${prop}`, () => {
                expect(pannerNodeMock[prop]).to.be.an.instanceOf(AudioParamMock);
            });
        });
    });

    describe('read-only properties behavior', () => {
        const readOnlyProperties = {
            coneInnerAngle: 360,
            coneOuterAngle: 0,
            coneOuterGain: 0,
            distanceModel: 'inverse',
            rolloffFactor: 1
        };

        Object.entries(readOnlyProperties).forEach(([property, newValue]) => {
            it(`${property} should not accept a new value`, () => {
                const originalValue = pannerNodeMock[property];

                pannerNodeMock[property] = newValue;
                expect(pannerNodeMock[property]).to.equal(originalValue);
            });
        });
    });

    describe('connect() and disconnect() methods', () => {
        let gainNodeMock;

        beforeEach(() => {
            gainNodeMock = audioContextMock.createGain();
        });

        it('should be chainable when connecting to an AudioNode', () => {
            expect(pannerNodeMock.connect(gainNodeMock)).to.equal(gainNodeMock);
        });

        it('should not be chainable when connecting to an AudioParam', () => {
            const gainParam = gainNodeMock.gain;
            const connectionResult = pannerNodeMock.connect(gainParam);

            expect(connectionResult).to.be.undefined;
        });

        it('should disconnect from connected AudioNode without errors', () => {
            pannerNodeMock.connect(gainNodeMock);
            expect(() => pannerNodeMock.disconnect(gainNodeMock)).not.to.throw();
        });
    });
});

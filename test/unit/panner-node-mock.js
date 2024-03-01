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

    describe('connect()', () => {
        for (const type of ['AudioNode', 'AudioParam']) {
            describe(`with an ${type}`, () => {
                let audioNodeOrAudioParam;

                beforeEach(() => {
                    const gainNode = audioContextMock.createGain();

                    audioNodeOrAudioParam = type === 'AudioNode' ? gainNode : gainNode.gain;
                });

                if (type === 'AudioNode') {
                    it('should be chainable', () => {
                        expect(pannerNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(pannerNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });

    describe('disconnect()', () => {
        for (const type of ['AudioNode', 'AudioParam']) {
            describe(`with an ${type}`, () => {
                let audioNodeOrAudioParam;

                beforeEach(() => {
                    const gainNode = audioContextMock.createGain();

                    audioNodeOrAudioParam = type === 'AudioNode' ? gainNode : gainNode.gain;

                    pannerNodeMock.connect(audioNodeOrAudioParam);
                });

                it('should be disconnectable', () => {
                    expect(pannerNodeMock.disconnect(audioNodeOrAudioParam)).to.be.undefined;
                });
            });
        }
    });
});

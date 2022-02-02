import { AudioContext, GainNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { GainNodeMock } from '../../src/gain-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('GainNodeMock', () => {
    let audioContextMock;
    let gainNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        gainNodeMock = new GainNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the GainNode interface', () => {
        const audioContext = new AudioContext();
        const gainNode = new GainNode(audioContext);

        for (const key of getAllKeys(gainNode)) {
            const property = gainNode[key];

            if (property === audioContext) {
                expect(gainNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(gainNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(gainNodeMock[key]).to.be.a('function');
            } else {
                expect(gainNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'GainNode')).to.deep.equal([gainNodeMock]);
    });

    describe('gain', () => {
        it('should be readonly', () => {
            gainNodeMock.gain = 'new value';

            expect(gainNodeMock.gain).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext();
            const gainNode = new GainNode(audioContext);

            for (const key of getAllKeys(gainNode.gain)) {
                const property = gainNode.gain[key];

                if (typeof property === 'function') {
                    expect(gainNodeMock.gain[key]).to.be.a('function');
                } else {
                    expect(gainNodeMock.gain[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });
});

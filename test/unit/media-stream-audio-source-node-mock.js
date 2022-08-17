import { AudioContext, MediaStreamAudioSourceNode } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { MediaStreamAudioSourceNodeMock } from '../../src/media-stream-audio-source-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('MediaStreamAudioSourceNodeMock', () => {
    let audioContext;
    let audioContextMock;
    let mediaStream;
    let mediaStreamAudioSourceNodeMock;

    afterEach(() => audioContext.close());

    beforeEach(() => {
        audioContext = new AudioContext({ sampleRate: 44100 });
        audioContextMock = new AudioContextMock();
        mediaStream = audioContext.createMediaStreamDestination().stream;
        mediaStreamAudioSourceNodeMock = new MediaStreamAudioSourceNodeMock(audioContextMock, { mediaStream });
    });

    it('should have all methods and properties of the MediaStreamAudioSourceNode interface', () => {
        const mediaStreamAudioSourceNode = new MediaStreamAudioSourceNode(audioContext, { mediaStream });

        for (const key of getAllKeys(mediaStreamAudioSourceNode)) {
            const property = mediaStreamAudioSourceNode[key];

            if (property === audioContext) {
                expect(mediaStreamAudioSourceNodeMock[key]).to.equal(audioContextMock);
            } else if (typeof property === 'function') {
                expect(mediaStreamAudioSourceNodeMock[key]).to.be.a('function');
            } else {
                expect(mediaStreamAudioSourceNodeMock[key]).to.equal(property);
            }
        }
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'MediaStreamAudioSourceNode')).to.deep.equal([mediaStreamAudioSourceNodeMock]);
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
                        expect(mediaStreamAudioSourceNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(mediaStreamAudioSourceNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });
});

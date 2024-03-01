import { AudioContext, MediaElementAudioSourceNode } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { MediaElementAudioSourceNodeMock } from '../../src/media-element-audio-source-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('MediaElementAudioSourceNodeMock', () => {
    let audioContextMock;
    let mediaElement;
    let mediaElementAudioSourceNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        mediaElement = new Audio();
        mediaElementAudioSourceNodeMock = new MediaElementAudioSourceNodeMock(audioContextMock, { mediaElement });
    });

    it('should have all methods and properties of the MediaElementAudioSourceNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const mediaElementAudioSourceNode = new MediaElementAudioSourceNode(audioContext, { mediaElement });

        for (const key of getAllKeys(mediaElementAudioSourceNode)) {
            const property = mediaElementAudioSourceNode[key];

            if (property === audioContext) {
                expect(mediaElementAudioSourceNodeMock[key]).to.equal(audioContextMock);
            } else if (typeof property === 'function') {
                expect(mediaElementAudioSourceNodeMock[key]).to.be.a('function');
            } else {
                expect(mediaElementAudioSourceNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'MediaElementAudioSourceNode')).to.deep.equal([mediaElementAudioSourceNodeMock]);
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
                        expect(mediaElementAudioSourceNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(mediaElementAudioSourceNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
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

                    mediaElementAudioSourceNodeMock.connect(audioNodeOrAudioParam);
                });

                it('should be disconnectable', () => {
                    expect(mediaElementAudioSourceNodeMock.disconnect(audioNodeOrAudioParam)).to.be.undefined;
                });
            });
        }
    });
});

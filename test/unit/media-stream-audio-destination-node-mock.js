import { AudioContext, MediaStreamAudioDestinationNode } from 'standardized-audio-context';
import { beforeEach, describe, expect, it } from 'vitest';
import { AudioContextMock } from '../../src/audio-context-mock';
import { MediaStreamAudioDestinationNodeMock } from '../../src/media-stream-audio-destination-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('MediaStreamAudioDestinationNodeMock', () => {
    let audioContextMock;
    let mediaStreamAudioDestinationNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        mediaStreamAudioDestinationNodeMock = new MediaStreamAudioDestinationNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the MediaStreamAudioDestinationNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const mediaStreamAudioDestinationNode = new MediaStreamAudioDestinationNode(audioContext);

        for (const key of getAllKeys(mediaStreamAudioDestinationNode)) {
            const property = mediaStreamAudioDestinationNode[key];

            if (property === audioContext) {
                expect(mediaStreamAudioDestinationNodeMock[key]).to.equal(audioContextMock);
            } else if (key === 'stream' && property instanceof MediaStream) {
                expect(mediaStreamAudioDestinationNodeMock[key]).to.be.an.instanceOf(MediaStream);
            } else if (typeof property === 'function') {
                expect(mediaStreamAudioDestinationNodeMock[key]).to.be.a('function');
            } else {
                expect(mediaStreamAudioDestinationNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'MediaStreamAudioDestinationNode')).to.deep.equal([
            mediaStreamAudioDestinationNodeMock
        ]);
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
                        expect(mediaStreamAudioDestinationNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(mediaStreamAudioDestinationNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
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

                    mediaStreamAudioDestinationNodeMock.connect(audioNodeOrAudioParam);
                });

                it('should be disconnectable', () => {
                    expect(mediaStreamAudioDestinationNodeMock.disconnect(audioNodeOrAudioParam)).to.be.undefined;
                });
            });
        }
    });
});

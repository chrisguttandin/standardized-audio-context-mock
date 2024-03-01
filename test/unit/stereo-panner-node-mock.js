import { AudioContext, StereoPannerNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { StereoPannerNodeMock } from '../../src/stereo-panner-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('StereoPannerNodeMock', () => {
    let audioContextMock;
    let stereoPannerNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        stereoPannerNodeMock = new StereoPannerNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the StereoPannerNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const stereoPannerNode = new StereoPannerNode(audioContext);

        for (const key of getAllKeys(stereoPannerNode)) {
            const property = stereoPannerNode[key];

            if (property === audioContext) {
                expect(stereoPannerNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(stereoPannerNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(stereoPannerNodeMock[key]).to.be.a('function');
            } else {
                expect(stereoPannerNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'StereoPannerNode')).to.deep.equal([stereoPannerNodeMock]);
    });

    describe('pan', () => {
        it('should be readonly', () => {
            stereoPannerNodeMock.pan = 'new value';

            expect(stereoPannerNodeMock.pan).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const stereoPannerNode = new StereoPannerNode(audioContext);

            for (const key of getAllKeys(stereoPannerNode.pan)) {
                const property = stereoPannerNode.pan[key];

                if (typeof property === 'function') {
                    expect(stereoPannerNodeMock.pan[key]).to.be.a('function');
                } else {
                    expect(stereoPannerNodeMock.pan[key]).to.equal(property);
                }
            }

            audioContext.close();
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
                        expect(stereoPannerNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(stereoPannerNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
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

                    stereoPannerNodeMock.connect(audioNodeOrAudioParam);
                });

                it('should be disconnectable', () => {
                    expect(stereoPannerNodeMock.disconnect(audioNodeOrAudioParam)).to.be.undefined;
                });
            });
        }
    });
});

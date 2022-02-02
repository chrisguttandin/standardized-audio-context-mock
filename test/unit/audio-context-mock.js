import {
    AudioBufferSourceNode,
    AudioContext,
    DynamicsCompressorNode,
    GainNode,
    MediaElementAudioSourceNode,
    OscillatorNode,
    StereoPannerNode,
    isAnyAudioParam
} from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('AudioContextMock', () => {
    let audioContextMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
    });

    describe('onstatechange', () => {
        it('should be null', () => {
            expect(audioContextMock.onstatechange).to.be.null;
        });

        it('should be assignable to a function', () => {
            const fn = () => {}; // eslint-disable-line unicorn/consistent-function-scoping
            const onstatechange = (audioContextMock.onstatechange = fn); // eslint-disable-line no-multi-assign

            expect(onstatechange).to.equal(fn);
            expect(audioContextMock.onstatechange).to.equal(fn);
        });

        it('should be assignable to null', () => {
            const onstatechange = (audioContextMock.onstatechange = null); // eslint-disable-line no-multi-assign

            expect(onstatechange).to.be.null;
            expect(audioContextMock.onstatechange).to.be.null;
        });

        it('should not be assignable to something else', () => {
            const string = 'no function or null value';

            audioContextMock.onstatechange = () => {};

            const onstatechange = (audioContextMock.onstatechange = string); // eslint-disable-line no-multi-assign

            expect(onstatechange).to.equal(string);
            expect(audioContextMock.onstatechange).to.be.null;
        });
    });

    describe('createBuffer()', () => {
        it('should return an instance of the AudioBuffer interface', () => {
            const audioBufferMock = audioContextMock.createBuffer(2, 10, 44100);

            expect(audioBufferMock.duration).to.be.closeTo(10 / 44100, 0.001);
            expect(audioBufferMock.length).to.equal(10);
            expect(audioBufferMock.numberOfChannels).to.equal(2);
            expect(audioBufferMock.sampleRate).to.equal(44100);
            expect(audioBufferMock.getChannelData).to.be.a('function');
            expect(audioBufferMock.copyFromChannel).to.be.a('function');
            expect(audioBufferMock.copyToChannel).to.be.a('function');
        });
    });

    describe('createBufferSource()', () => {
        let audioBufferSourceNodeMock;

        beforeEach(() => (audioBufferSourceNodeMock = audioContextMock.createBufferSource()));

        it('should return an instance of the AudioBufferSourceNode interface', () => {
            const audioContext = new AudioContext();
            const audioBufferSourceNode = new AudioBufferSourceNode(audioContext);

            for (const key of getAllKeys(audioBufferSourceNode)) {
                const property = audioBufferSourceNode[key];

                if (property === audioContext) {
                    expect(audioBufferSourceNodeMock[key]).to.equal(audioContextMock);
                } else if (isAnyAudioParam(property)) {
                    expect(audioBufferSourceNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
                } else if (typeof property === 'function') {
                    expect(audioBufferSourceNodeMock[key]).to.be.a('function');
                } else {
                    expect(audioBufferSourceNodeMock[key]).to.equal(property);
                }
            }

            audioContext.close();
        });

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode')).to.deep.equal([audioBufferSourceNodeMock]);
        });
    });

    describe('createDynamicsCompressorNode()', () => {
        let dynamicsCompressorNodeMock;

        beforeEach(() => (dynamicsCompressorNodeMock = audioContextMock.createDynamicsCompressor()));

        it('should return an instance of the DynamicsCompressorNode interface', () => {
            const audioContext = new AudioContext();
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode)) {
                const property = dynamicsCompressorNode[key];

                if (property === audioContext) {
                    expect(dynamicsCompressorNodeMock[key]).to.equal(audioContextMock);
                } else if (isAnyAudioParam(property)) {
                    expect(dynamicsCompressorNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
                } else if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock[key]).to.equal(property);
                }
            }

            audioContext.close();
        });

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'DynamicsCompressorNode')).to.deep.equal([dynamicsCompressorNodeMock]);
        });
    });

    describe('createGain()', () => {
        let gainNodeMock;

        beforeEach(() => (gainNodeMock = audioContextMock.createGain()));

        it('should return an instance of the GainNode interface', () => {
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

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'GainNode')).to.deep.equal([gainNodeMock]);
        });
    });

    describe('createMediaElementSource()', () => {
        let mediaElement;
        let mediaElementAudioSourceNodeMock;

        beforeEach(() => {
            mediaElement = new Audio();
            mediaElementAudioSourceNodeMock = audioContextMock.createMediaElementSource(mediaElement);
        });

        it('should return an instance of the MediaElementAudioSourceNode interface', () => {
            const audioContext = new AudioContext();
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

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'MediaElementAudioSourceNode')).to.deep.equal([
                mediaElementAudioSourceNodeMock
            ]);
        });
    });

    describe('createOscillator()', () => {
        let oscillatorNodeMock;

        beforeEach(() => (oscillatorNodeMock = audioContextMock.createOscillator()));

        it('should return an instance of the OscillatorNode interface', () => {
            const audioContext = new AudioContext();
            const oscillatorNode = new OscillatorNode(audioContext);

            for (const key of getAllKeys(oscillatorNode)) {
                const property = oscillatorNode[key];

                if (property === audioContext) {
                    expect(oscillatorNodeMock[key]).to.equal(audioContextMock);
                } else if (isAnyAudioParam(property)) {
                    expect(oscillatorNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
                } else if (typeof property === 'function') {
                    expect(oscillatorNodeMock[key]).to.be.a('function');
                } else {
                    expect(oscillatorNodeMock[key]).to.equal(property);
                }
            }

            audioContext.close();
        });

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'OscillatorNode')).to.deep.equal([oscillatorNodeMock]);
        });
    });

    describe('createStereoPanner()', () => {
        let stereoPannerNodeMock;

        beforeEach(() => (stereoPannerNodeMock = audioContextMock.createStereoPanner()));

        it('should return an instance of the StereoPannerNode interface', () => {
            const audioContext = new AudioContext();
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

        it('should register the returned instance', () => {
            expect(registrar.getAudioNodes(audioContextMock, 'StereoPannerNode')).to.deep.equal([stereoPannerNodeMock]);
        });
    });

    describe('decodeAudioData()', () => {
        it('should return an instance of a Promise', () => {
            expect(audioContextMock.decodeAudioData()).to.be.an.instanceOf(Promise);
        });

        it('should resolve the promise with an instance of the AudioBuffer interface', async () => {
            const audioBufferMock = await audioContextMock.decodeAudioData();

            expect(audioBufferMock.duration).to.be.closeTo(10 / 44100, 0.001);
            expect(audioBufferMock.length).to.equal(10);
            expect(audioBufferMock.numberOfChannels).to.equal(1);
            expect(audioBufferMock.sampleRate).to.equal(44100);
            expect(audioBufferMock.getChannelData).to.be.a('function');
            expect(audioBufferMock.copyFromChannel).to.be.a('function');
            expect(audioBufferMock.copyToChannel).to.be.a('function');
        });
    });
});

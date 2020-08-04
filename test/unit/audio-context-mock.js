import { AudioContextMock } from '../../src/audio-context-mock';
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
        it('should return an instance of the AudioBufferSourceNode interface', () => {
            const audioBufferSourceNodeMock = audioContextMock.createBufferSource();

            expect(audioBufferSourceNodeMock.buffer).to.be.null;

            /*
             * expect(audioBufferSourceNodeMock.detune.cancelScheduledValues).to.be.a('function');
             * expect(audioBufferSourceNodeMock.detune.defaultValue).to.equal(0);
             * expect(audioBufferSourceNodeMock.detune.exponentialRampToValueAtTime).to.be.a('function');
             * expect(audioBufferSourceNodeMock.detune.linearRampToValueAtTime).to.be.a('function');
             * expect(audioBufferSourceNodeMock.detune.setTargetAtTime).to.be.a('function');
             * expect(audioBufferSourceNodeMock.detune.setValueCurveAtTime).to.be.a('function');
             * expect(audioBufferSourceNodeMock.detune.value).to.equal(0);
             */

            expect(audioBufferSourceNodeMock.loop).to.be.false;
            expect(audioBufferSourceNodeMock.loopEnd).to.equal(0);
            expect(audioBufferSourceNodeMock.loopStart).to.equal(0);
            expect(audioBufferSourceNodeMock.numberOfInputs).to.equal(0);
            expect(audioBufferSourceNodeMock.numberOfOutputs).to.equal(1);
            expect(audioBufferSourceNodeMock.onended).to.be.null;

            expect(audioBufferSourceNodeMock.playbackRate.cancelScheduledValues).to.be.a('function');
            expect(audioBufferSourceNodeMock.playbackRate.defaultValue).to.equal(1);
            expect(audioBufferSourceNodeMock.playbackRate.exponentialRampToValueAtTime).to.be.a('function');
            expect(audioBufferSourceNodeMock.playbackRate.linearRampToValueAtTime).to.be.a('function');
            expect(audioBufferSourceNodeMock.playbackRate.setTargetAtTime).to.be.a('function');
            expect(audioBufferSourceNodeMock.playbackRate.setValueCurveAtTime).to.be.a('function');
            expect(audioBufferSourceNodeMock.playbackRate.value).to.equal(1);

            expect(audioBufferSourceNodeMock.start).to.be.a('function');
            expect(audioBufferSourceNodeMock.stop).to.be.a('function');
        });

        it('should register the returned instance', () => {
            const audioBufferSourceNodeMock = audioContextMock.createBufferSource();

            expect(registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode')).to.deep.equal([audioBufferSourceNodeMock]);
        });
    });

    describe('createDynamicsCompressorNode()', function () {
        it('should return an instance of the DynamicsCompressorNode interface', function () {
            const dynamicsCompressorNode = audioContextMock.createDynamicsCompressor();

            expect(dynamicsCompressorNode.channelCount).to.equal(2);
            expect(dynamicsCompressorNode.channelCountMode).to.equal('explicit');
            expect(dynamicsCompressorNode.channelInterpretation).to.equal('speakers');

            expect(dynamicsCompressorNode.attack.cancelScheduledValues).to.be.a('function');
            expect(dynamicsCompressorNode.attack.defaultValue).to.equal(0.003);
            expect(dynamicsCompressorNode.attack.exponentialRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.attack.linearRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.attack.setTargetAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.attack.setValueCurveAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.attack.value).to.equal(0.003);

            expect(dynamicsCompressorNode.knee.cancelScheduledValues).to.be.a('function');
            expect(dynamicsCompressorNode.knee.defaultValue).to.equal(30);
            expect(dynamicsCompressorNode.knee.exponentialRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.knee.linearRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.knee.setTargetAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.knee.setValueCurveAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.knee.value).to.equal(30);

            expect(dynamicsCompressorNode.numberOfInputs).to.equal(1);
            expect(dynamicsCompressorNode.numberOfOutputs).to.equal(1);

            expect(dynamicsCompressorNode.ratio.cancelScheduledValues).to.be.a('function');
            expect(dynamicsCompressorNode.ratio.defaultValue).to.equal(12);
            expect(dynamicsCompressorNode.ratio.exponentialRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.ratio.linearRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.ratio.setTargetAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.ratio.setValueCurveAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.ratio.value).to.equal(12);

            expect(dynamicsCompressorNode.reduction).to.equal(0);

            expect(dynamicsCompressorNode.release.cancelScheduledValues).to.be.a('function');
            expect(dynamicsCompressorNode.release.defaultValue).to.equal(0.25);
            expect(dynamicsCompressorNode.release.exponentialRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.release.linearRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.release.setTargetAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.release.setValueCurveAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.release.value).to.equal(0.25);

            expect(dynamicsCompressorNode.threshold.cancelScheduledValues).to.be.a('function');
            expect(dynamicsCompressorNode.threshold.defaultValue).to.equal(-24);
            expect(dynamicsCompressorNode.threshold.exponentialRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.threshold.linearRampToValueAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.threshold.setTargetAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.threshold.setValueCurveAtTime).to.be.a('function');
            expect(dynamicsCompressorNode.threshold.value).to.equal(-24);
        });

        it('should register the returned instance', () => {
            const dynamicsCompressorNode = audioContextMock.createDynamicsCompressor();

            expect(registrar.getAudioNodes(audioContextMock, 'DynamicsCompressorNode')).to.deep.equal([dynamicsCompressorNode]);
        });
    });

    describe('createGain()', () => {
        it('should return an instance of the GainNode interface', () => {
            const gainNodeMock = audioContextMock.createGain();

            expect(gainNodeMock.channelCountMode).to.equal('max');
            expect(gainNodeMock.channelInterpretation).to.equal('speakers');

            expect(gainNodeMock.gain.cancelScheduledValues).to.be.a('function');
            expect(gainNodeMock.gain.defaultValue).to.equal(1);
            expect(gainNodeMock.gain.exponentialRampToValueAtTime).to.be.a('function');
            expect(gainNodeMock.gain.linearRampToValueAtTime).to.be.a('function');
            expect(gainNodeMock.gain.setTargetAtTime).to.be.a('function');
            expect(gainNodeMock.gain.setValueCurveAtTime).to.be.a('function');
            expect(gainNodeMock.gain.value).to.equal(1);

            expect(gainNodeMock.numberOfInputs).to.equal(1);
            expect(gainNodeMock.numberOfOutputs).to.equal(1);
        });

        it('should register the returned instance', () => {
            const gainNodeMock = audioContextMock.createGain();

            expect(registrar.getAudioNodes(audioContextMock, 'GainNode')).to.deep.equal([gainNodeMock]);
        });
    });

    describe('createOscillator()', function () {
        it('should return an instance of the OscillatorNode interface', function () {
            const oscillatorNode = audioContextMock.createOscillator();

            /*
             * channelCount is not specified
             * channelCountMode is not specified
             * channelInterpretation is not specified
             */

            expect(oscillatorNode.detune.cancelScheduledValues).to.be.a('function');
            expect(oscillatorNode.detune.defaultValue).to.equal(0);
            expect(oscillatorNode.detune.exponentialRampToValueAtTime).to.be.a('function');
            expect(oscillatorNode.detune.linearRampToValueAtTime).to.be.a('function');
            expect(oscillatorNode.detune.setTargetAtTime).to.be.a('function');
            expect(oscillatorNode.detune.setValueCurveAtTime).to.be.a('function');
            expect(oscillatorNode.detune.value).to.equal(0);

            expect(oscillatorNode.frequency.cancelScheduledValues).to.be.a('function');
            expect(oscillatorNode.frequency.defaultValue).to.equal(440);
            expect(oscillatorNode.frequency.exponentialRampToValueAtTime).to.be.a('function');
            expect(oscillatorNode.frequency.linearRampToValueAtTime).to.be.a('function');
            expect(oscillatorNode.frequency.setTargetAtTime).to.be.a('function');
            expect(oscillatorNode.frequency.setValueCurveAtTime).to.be.a('function');
            expect(oscillatorNode.frequency.value).to.equal(440);

            expect(oscillatorNode.numberOfInputs).to.equal(0);
            expect(oscillatorNode.numberOfOutputs).to.equal(1);
            expect(oscillatorNode.type).to.equal('sine');
            expect(oscillatorNode.setPeriodicWave).to.be.a('function');
            expect(oscillatorNode.start).to.be.a('function');
            expect(oscillatorNode.stop).to.be.a('function');
        });

        it('should register the returned instance', () => {
            const oscillatorNode = audioContextMock.createOscillator();

            expect(registrar.getAudioNodes(audioContextMock, 'OscillatorNode')).to.deep.equal([oscillatorNode]);
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

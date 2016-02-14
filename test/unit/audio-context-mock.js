import { AudioContextMock } from '../../src/audio-context-mock';
import { registrar } from '../../src/registrar';

describe('AudioContextMock', () => {

    var audioContextMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
    });

    describe('createBuffer()', () => {

        it('should return an instance of the AudioBuffer interface', () => {
            var audioBufferMock = audioContextMock.createBuffer(2, 10, 44100);

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
            var audioBufferSourceNodeMock = audioContextMock.createBufferSource();

            expect(audioBufferSourceNodeMock.buffer).to.be.null;

            // expect(audioBufferSourceNodeMock.detune.cancelScheduledValues).to.be.a('function');
            // expect(audioBufferSourceNodeMock.detune.defaultValue).to.equal(0);
            // expect(audioBufferSourceNodeMock.detune.exponentialRampToValueAtTime).to.be.a('function');
            // expect(audioBufferSourceNodeMock.detune.linearRampToValueAtTime).to.be.a('function');
            // expect(audioBufferSourceNodeMock.detune.setTargetAtTime).to.be.a('function');
            // expect(audioBufferSourceNodeMock.detune.setValueCurveAtTime).to.be.a('function');
            // expect(audioBufferSourceNodeMock.detune.value).to.equal(0);

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
            var audioBufferSourceNodeMock = audioContextMock.createBufferSource();

            expect(registrar.get(audioContextMock, 'AudioBufferSourceNode')).to.deep.equal([ audioBufferSourceNodeMock ]);
        });

    });

    describe('createGain()', () => {

        it('should return an instance of the GainNode interface', () => {
            var gainNodeMock = audioContextMock.createGain();

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
            var gainNodeMock = audioContextMock.createGain();

            expect(registrar.get(audioContextMock, 'GainNode')).to.deep.equal([ gainNodeMock ]);
        });

    });

});

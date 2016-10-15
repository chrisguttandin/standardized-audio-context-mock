import { AudioBufferMock } from '../../src/audio-buffer-mock';
import { AudioBufferSourceNodeMock } from '../../src/audio-buffer-source-node-mock';
import { AudioEventScheduler } from '../../src/helper/audio-event-scheduler';
import { AudioParamMock } from '../../src/audio-param-mock';
import { spy } from 'sinon';

describe('AudioBufferSourceNodeMock', () => {

    var audioBufferSourceNodeMock,
        scheduler;

    beforeEach(() => {
        scheduler = new AudioEventScheduler();

        audioBufferSourceNodeMock = new AudioBufferSourceNodeMock({
            scheduler
        });
        audioBufferSourceNodeMock.buffer = new AudioBufferMock({
            length: 441000,
            numberOfChannels: 2,
            sampleRate: 44100
        });
    });

    describe('onended', () => {

        var onEnded;

        beforeEach(() => {
            onEnded = spy();
        });

        it('should have a default value of null', () => {
            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should only accept functions or null as assigned values', () => {
            audioBufferSourceNodeMock.onended = 'not a function';

            expect(audioBufferSourceNodeMock.onended).to.be.null;

            audioBufferSourceNodeMock.onended = onEnded;

            expect(audioBufferSourceNodeMock.onended).to.equal(onEnded);

            audioBufferSourceNodeMock.onended = null;

            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should reschedule the onEnded event when setting playbackRate\'s value property before playing', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.value = 2;

            scheduler.flush(4);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(1);

            expect(onEnded).to.have.been.calledOnce;
        });

        it('should reschedule the onEnded event when setting playbackRate\'s value property while playing', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);

            scheduler.flush(5);
            audioBufferSourceNodeMock.playbackRate.value = 2;
            scheduler.flush(2);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(0.5);

            expect(onEnded).to.have.been.calledOnce;
        });

        it('should reschedule the onEnded event when calling playbackRate\'s setValueAtTime() method before playing', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 5);

            scheduler.flush(7);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(0.5);

            expect(onEnded).to.have.been.calledOnce;
        });

        it('should reschedule the onEnded event when calling playbackRate\'s setValueAtTime() method multiple times before playing', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 2);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 4);

            scheduler.flush(7.5);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(0.5);

            expect(onEnded).to.have.been.calledOnce;
        });

        it('should reschedule the onEnded event when calling playbackRate\'s linearRampToValueAtTime() method before playing', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 0);
            audioBufferSourceNodeMock.playbackRate.linearRampToValueAtTime(1.5, 1);

            scheduler.flush(6.8);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(0.04);

            expect(onEnded).to.have.been.calledOnce;
        });

    });

    describe('playbackRate', () => {

        it('should be readonly', () => {
            audioBufferSourceNodeMock.playbackRate = 'new value';

            expect(audioBufferSourceNodeMock.playbackRate).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(audioBufferSourceNodeMock.playbackRate).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 1', () => {
            expect(audioBufferSourceNodeMock.playbackRate.defaultValue).to.equal(1);
        });

        it('should have a value of 1', () => {
            expect(audioBufferSourceNodeMock.playbackRate.value).to.equal(1);
        });

    });

    describe('start()', () => {

        var onEnded;

        beforeEach(() => {
            onEnded = spy();
        });

        it('should schedule the onEnded event when started now', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0);

            scheduler.flush(9);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(1);

            expect(onEnded).to.have.been.calledOnce;
        });

        it('should schedule the onEnded event when started in the future', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(5);

            scheduler.flush(14);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(1);

            expect(onEnded).to.have.been.calledOnce;
        });

    });

    describe('stop()', () => {

        var onEnded;

        beforeEach(() => {
            onEnded = spy();
        });

        it('should reschedule the onEnded event', () => {
            audioBufferSourceNodeMock.onended = onEnded;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.stop(5);

            scheduler.flush(4);

            expect(onEnded).to.have.not.been.called;

            scheduler.flush(1);

            expect(onEnded).to.have.been.calledOnce;
        });

    });

});

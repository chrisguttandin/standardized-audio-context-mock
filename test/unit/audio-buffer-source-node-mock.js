import { AudioBufferMock } from '../../src/audio-buffer-mock';
import { AudioBufferSourceNodeMock } from '../../src/audio-buffer-source-node-mock';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { registrar } from '../../src/registrar';
import { spy } from 'sinon';

describe('AudioBufferSourceNodeMock', () => {

    let audioBufferSourceNodeMock;
    let vehicle;

    beforeEach(() => {
        const context = new AudioContextMock({ sampleRate: 1280 });

        audioBufferSourceNodeMock = new AudioBufferSourceNodeMock(context);
        audioBufferSourceNodeMock.buffer = new AudioBufferMock({
            length: 12800,
            numberOfChannels: 2,
            sampleRate: 1280
        });

        vehicle = registrar.getVehicle(context);
    });

    describe('detune', () => {

        it('should be readonly', () => {
            audioBufferSourceNodeMock.detune = 'new value';

            expect(audioBufferSourceNodeMock.detune).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(audioBufferSourceNodeMock.detune).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 0', () => {
            expect(audioBufferSourceNodeMock.detune.defaultValue).to.equal(0);
        });

        it('should have a value of 0', () => {
            expect(audioBufferSourceNodeMock.detune.value).to.equal(0);
        });

    });

    describe('onended', () => {

        let onended;

        beforeEach(() => {
            onended = spy();
        });

        it('should have a default value of null', () => {
            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should only accept functions or null as assigned values', () => {
            audioBufferSourceNodeMock.onended = 'not a function';

            expect(audioBufferSourceNodeMock.onended).to.be.null;

            audioBufferSourceNodeMock.onended = onended;

            expect(audioBufferSourceNodeMock.onended).to.equal(onended);

            audioBufferSourceNodeMock.onended = null;

            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should reschedule the onended event when setting playbackRate\'s value property before playing', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.value = 2;

            vehicle.travel(4);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

        it('should reschedule the onended event when setting playbackRate\'s value property while playing', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);

            vehicle.travel(5);
            audioBufferSourceNodeMock.playbackRate.value = 2;
            vehicle.travel(2);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.5);

            expect(onended).to.have.been.calledOnce;
        });

        it('should reschedule the onended event when calling playbackRate\'s setValueAtTime() method before playing', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 5);

            vehicle.travel(7);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.5);

            expect(onended).to.have.been.calledOnce;
        });

        it('should reschedule the onended event when calling playbackRate\'s setValueAtTime() method multiple times before playing', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 2);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 4);

            vehicle.travel(7.5);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.5);

            expect(onended).to.have.been.calledOnce;
        });

        it('should reschedule the onended event when calling playbackRate\'s linearRampToValueAtTime() method before playing', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 0);
            audioBufferSourceNodeMock.playbackRate.linearRampToValueAtTime(1.5, 1);

            vehicle.travel(6.8);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.05);

            expect(onended).to.have.been.calledOnce;
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

        let onended;

        beforeEach(() => {
            onended = spy();
        });

        it('should schedule the onended event when started now', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0);

            vehicle.travel(9);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

        it('should schedule the onended event when started in the future', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(5);

            vehicle.travel(14);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

    });

    describe('stop()', () => {

        let onended;

        beforeEach(() => {
            onended = spy();
        });

        it('should reschedule the onended event', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.stop(5);

            vehicle.travel(4);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

    });

});

import { AudioEventScheduler } from '../../../src/helper/audio-event-scheduler';
import { spy } from 'sinon';

describe('AudioEventScheduler', () => {

    var audioEventScheduler;

    beforeEach(() => {
        audioEventScheduler = new AudioEventScheduler();
    });

    describe('cancel()', () => {

        // tested below

    });

    describe('flush()', () => {

        it('shoud update the currentTime after flushing', () => {
            expect(audioEventScheduler.currentTime).to.equal(0);

            audioEventScheduler.flush(20);

            expect(audioEventScheduler.currentTime).to.equal(20);
        });

        it('shoud execute a scheduled function', () => {
            var func = spy();

            audioEventScheduler.schedule({
                func,
                when: 10
            });

            audioEventScheduler.flush(9);

            expect(func).to.have.not.been.called;

            audioEventScheduler.flush(1);

            expect(func).to.have.been.calledOnce;
        });

        it('shoud not execute a canceled function', () => {
            var definition,
                func;

            func = spy();
            definition = {
                func,
                when: 10
            };

            audioEventScheduler.schedule(definition);
            audioEventScheduler.cancel(definition);

            audioEventScheduler.flush(10);

            expect(func).to.have.not.been.called;
        });

    });

    describe('schedule()', () => {

        // tested above

    });

});

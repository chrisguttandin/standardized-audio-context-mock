import { AudioEventScheduler } from '../../../src/helper/audio-event-scheduler';
import { spy } from 'sinon';

describe('AudioEventScheduler', () => {

    let audioEventScheduler;

    beforeEach(() => {
        audioEventScheduler = new AudioEventScheduler();
    });

    describe('nextTime', () => {

        describe('without any scheduled function', () => {

            it('shoud default to infinity', () => {
                expect(audioEventScheduler.nextTime).to.equal(Number.POSITIVE_INFINITY);
            });

        });

        describe('with a scheduled function', () => {

            let when;

            beforeEach(() => {
                when = 10;

                audioEventScheduler.schedule({ func () { }, when });
            });

            it('shoud equal to the time of the next event', () => {
                expect(audioEventScheduler.nextTime).to.equal(when);
            });

        });

        describe('with a canceled function', () => {

            beforeEach(() => {
                const definition = {
                    func () { },
                    when: 10
                };

                audioEventScheduler.schedule(definition);
                audioEventScheduler.cancel(definition);
            });

            it('shoud equal to infinity', () => {
                expect(audioEventScheduler.nextTime).to.equal(Number.POSITIVE_INFINITY);
            });

        });

        describe('with an executed function', () => {

            beforeEach(() => {
                const when = 10;

                audioEventScheduler.schedule({ func () { }, when });
                audioEventScheduler.flush(when);
            });

            it('shoud equal to infinity', () => {
                expect(audioEventScheduler.nextTime).to.equal(Number.POSITIVE_INFINITY);
            });

        });

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
            const func = spy();

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
            const func = spy();
            const definition = {
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

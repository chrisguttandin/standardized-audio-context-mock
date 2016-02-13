import { AudioEventScheduler } from '../../src/helper/audio-event-scheduler';
import { AudioParamMock } from '../../src/audio-param-mock';

describe('AudioParamMock', () => {

    var audioParamMock,
        scheduler;

    beforeEach(() => {
        scheduler = new AudioEventScheduler();

        audioParamMock = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: scheduler,
            value: 1
        });
    });

    describe('defaultValue', () => {

        it('should have the value specified in the constructor', () => {
            expect(audioParamMock.defaultValue).to.equal(1);
        });

        it('should be readonly', () => {
            audioParamMock.defaultValue = 2;

            expect(audioParamMock.defaultValue).to.not.equal(2);
        });

    });

    describe('value', () => {

        it('should have the value specified in the constructor', () => {
            expect(audioParamMock.value).to.equal(1);
        });

        it('should be writable', () => {
            audioParamMock.value = 2;

            expect(audioParamMock.value).to.equal(2);
        });

    });

    describe('linearRampToValueAtTime()', () => {

        it('should compute the value correctly', () => {
            audioParamMock.setValueAtTime(1, 0);
            audioParamMock.linearRampToValueAtTime(2, 1);
            audioParamMock.linearRampToValueAtTime(3, 2);

            expect(audioParamMock.value).to.equal(1);

            scheduler.flush(0.5);

            expect(audioParamMock.value).to.equal(1.5);

            scheduler.flush(0.5);

            expect(audioParamMock.value).to.equal(2);

            scheduler.flush(0.5);

            expect(audioParamMock.value).to.equal(2.5);

            scheduler.flush(0.5);

            expect(audioParamMock.value).to.equal(3);

            scheduler.flush(1);

            expect(audioParamMock.value).to.equal(3);
        });

        // @todo test strange behaviour without calling setValueAtTime() first

    });

    describe('setValueAtTime()', () => {

        it('should compute the value correctly', () => {
            audioParamMock.setValueAtTime(2, 0);
            audioParamMock.setValueAtTime(3, 1);

            expect(audioParamMock.value).to.equal(2);

            scheduler.flush(1);

            expect(audioParamMock.value).to.equal(3);

            scheduler.flush(1);

            expect(audioParamMock.value).to.equal(3);
        });

    });

});

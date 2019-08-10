import { AudioParamMock } from '../../src/audio-param-mock';
import { AutomationEventList } from 'automation-events';
import { DeLorean } from 'vehicles';

describe('AudioParamMock', () => {

    let audioParamMock;
    let deLorean;

    beforeEach(() => {
        deLorean = new DeLorean();

        audioParamMock = new AudioParamMock({
            automationEventList: new AutomationEventList(1),
            deLorean,
            maxValue: 18,
            minValue: 0
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

    describe('maxValue', () => {

        it('should have the maxValue specified in the constructor', () => {
            expect(audioParamMock.maxValue).to.equal(18);
        });

        it('should be readonly', () => {
            audioParamMock.maxValue = 2;

            expect(audioParamMock.maxValue).to.not.equal(2);
        });

    });

    describe('minValue', () => {

        it('should have the minValue specified in the constructor', () => {
            expect(audioParamMock.minValue).to.equal(0);
        });

        it('should be readonly', () => {
            audioParamMock.minValue = 2;

            expect(audioParamMock.minValue).to.not.equal(2);
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

            deLorean.travel(0.5);

            expect(audioParamMock.value).to.equal(1.5);

            deLorean.travel(0.5);

            expect(audioParamMock.value).to.equal(2);

            deLorean.travel(0.5);

            expect(audioParamMock.value).to.equal(2.5);

            deLorean.travel(0.5);

            expect(audioParamMock.value).to.equal(3);

            deLorean.travel(1);

            expect(audioParamMock.value).to.equal(3);
        });

        // @todo test strange behaviour without calling setValueAtTime() first

    });

    describe('setValueAtTime()', () => {

        it('should compute the value correctly', () => {
            audioParamMock.setValueAtTime(2, 0);
            audioParamMock.setValueAtTime(3, 1);

            expect(audioParamMock.value).to.equal(2);

            deLorean.travel(1);

            expect(audioParamMock.value).to.equal(3);

            deLorean.travel(1);

            expect(audioParamMock.value).to.equal(3);
        });

    });

});

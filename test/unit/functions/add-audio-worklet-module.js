import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { addAudioWorkletModule } from '../../../src/functions/add-audio-worklet-module';
import { stub } from 'sinon';

describe('addAudioWorkletModule()', () => {
    it('should return a Promise which resolves to undefined', async () => {
        expect(await addAudioWorkletModule()).to.be.undefined;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return a Promise which resolves to undefined', async () => {
            expect(await addAudioWorkletModule()).to.be.undefined;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            addAudioWorkletModule.returns(value);

            expect(addAudioWorkletModule()).to.equal(value);
        });
    });

    describe('with Vitest as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => vi.fn().mockImplementation(defaultImplementation));
        });

        it('should return a Promise which resolves to undefined', async () => {
            expect(await addAudioWorkletModule()).to.be.undefined;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            addAudioWorkletModule.mockReturnValue(value);

            expect(addAudioWorkletModule()).to.equal(value);
        });
    });
});

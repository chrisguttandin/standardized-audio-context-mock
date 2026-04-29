import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { isAnyOfflineAudioContext } from '../../../src/functions/is-any-offline-audio-context';
import { stub } from 'sinon';

describe('isAnyOfflineAudioContext()', () => {
    it('should return true', () => {
        expect(isAnyOfflineAudioContext()).to.be.true;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return true', () => {
            expect(isAnyOfflineAudioContext()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyOfflineAudioContext.returns(value);

            expect(isAnyOfflineAudioContext()).to.equal(value);
        });
    });

    describe('with Vitest as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => vi.fn().mockImplementation(defaultImplementation));
        });

        it('should return true', () => {
            expect(isAnyOfflineAudioContext()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyOfflineAudioContext.mockReturnValue(value);

            expect(isAnyOfflineAudioContext()).to.equal(value);
        });
    });
});

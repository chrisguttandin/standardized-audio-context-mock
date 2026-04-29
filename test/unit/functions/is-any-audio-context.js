import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { isAnyAudioContext } from '../../../src/functions/is-any-audio-context';
import { stub } from 'sinon';

describe('isAnyAudioContext()', () => {
    it('should return true', () => {
        expect(isAnyAudioContext()).to.be.true;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return true', () => {
            expect(isAnyAudioContext()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioContext.returns(value);

            expect(isAnyAudioContext()).to.equal(value);
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
            expect(isAnyAudioContext()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioContext.mockReturnValue(value);

            expect(isAnyAudioContext()).to.equal(value);
        });
    });
});

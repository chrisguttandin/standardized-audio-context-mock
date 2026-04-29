import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { isAnyAudioParam } from '../../../src/functions/is-any-audio-param';
import { stub } from 'sinon';

describe('isAnyAudioParam()', () => {
    it('should return true', () => {
        expect(isAnyAudioParam()).to.be.true;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return true', () => {
            expect(isAnyAudioParam()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioParam.returns(value);

            expect(isAnyAudioParam()).to.equal(value);
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
            expect(isAnyAudioParam()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioParam.mockReturnValue(value);

            expect(isAnyAudioParam()).to.equal(value);
        });
    });
});

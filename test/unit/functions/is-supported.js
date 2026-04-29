import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { isSupported } from '../../../src/functions/is-supported';
import { stub } from 'sinon';

describe('isSupported()', () => {
    it('should return true', () => {
        expect(isSupported()).to.be.true;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return true', () => {
            expect(isSupported()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isSupported.returns(value);

            expect(isSupported()).to.equal(value);
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
            expect(isSupported()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isSupported.mockReturnValue(value);

            expect(isSupported()).to.equal(value);
        });
    });
});

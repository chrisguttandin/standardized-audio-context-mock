import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { isAnyAudioNode } from '../../../src/functions/is-any-audio-node';
import { stub } from 'sinon';

describe('isAnyAudioNode()', () => {
    it('should return true', () => {
        expect(isAnyAudioNode()).to.be.true;
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return true', () => {
            expect(isAnyAudioNode()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioNode.returns(value);

            expect(isAnyAudioNode()).to.equal(value);
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
            expect(isAnyAudioNode()).to.be.true;
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            isAnyAudioNode.mockReturnValue(value);

            expect(isAnyAudioNode()).to.equal(value);
        });
    });
});

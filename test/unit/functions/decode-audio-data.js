import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetMockingImplementation, setMockingImplementation } from '../../../src/mocking-implementation';
import { AudioBufferMock } from '../../../src/audio-buffer-mock';
import { decodeAudioData } from '../../../src/functions/decode-audio-data';
import { stub } from 'sinon';

describe('decodeAudioData()', () => {
    it('should return a Promise which resolves to an AudioBufferMock instance', async () => {
        expect(await decodeAudioData()).to.be.an.instanceOf(AudioBufferMock);
    });

    describe('with Sinon.JS as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));
        });

        it('should return a Promise which resolves to an AudioBufferMock instance', async () => {
            expect(await decodeAudioData()).to.be.an.instanceOf(AudioBufferMock);
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            decodeAudioData.returns(value);

            expect(decodeAudioData()).to.equal(value);
        });
    });

    describe('with Vitest as the mocking implementation', () => {
        afterEach(() => {
            resetMockingImplementation();
        });

        beforeEach(() => {
            setMockingImplementation((defaultImplementation) => vi.fn().mockImplementation(defaultImplementation));
        });

        it('should return a Promise which resolves to an AudioBufferMock instance', async () => {
            expect(await decodeAudioData()).to.be.an.instanceOf(AudioBufferMock);
        });

        it('should return the configured value', () => {
            const value = Symbol('a fake value');

            decodeAudioData.mockReturnValue(value);

            expect(decodeAudioData()).to.equal(value);
        });
    });
});

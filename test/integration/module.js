import * as standardizedAudioContext from 'standardized-audio-context';
import * as standardizedAudioContextMock from '../../src/module';
import { describe, expect, it } from 'vitest';

describe('module', () => {
    it('should export all expected exports', () => {
        expect(standardizedAudioContextMock).to.have.keys(...Object.keys(standardizedAudioContext), 'AudioNode', 'registrar');
    });
});

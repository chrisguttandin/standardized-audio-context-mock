import { AudioBufferMock } from '../audio-buffer-mock';
import { createMockableFunction } from '../mocking-implementation';

export const decodeAudioData = createMockableFunction(() => Promise.resolve(new AudioBufferMock({ length: 10, sampleRate: 48000 })));

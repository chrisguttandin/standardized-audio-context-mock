import { stub } from 'sinon';
import { AudioBufferMock } from '../audio-buffer-mock';

export const decodeAudioData = stub()
    .callsFake(({ sampleRate }) => Promise.resolve(new AudioBufferMock({ length: 10, sampleRate })));

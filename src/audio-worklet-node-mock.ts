import { TContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';

export class AudioWorkletNodeMock<T extends TContext> extends AudioNodeMock<T> /* implements IAudioWorkletNode<T> */ {
    // @todo
}

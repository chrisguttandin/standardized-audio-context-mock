import { TContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';

export class MediaStreamAudioDestinationNodeMock<T extends TContext> extends AudioNodeMock<
    T
> /* implements IMediaStreamAudioDestinationNode<T> */ {
    // @todo
}

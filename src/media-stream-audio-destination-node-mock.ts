import { IAudioContext, IMediaStreamAudioDestinationNode, IMinimalAudioContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { registrar } from './registrar';

export class MediaStreamAudioDestinationNodeMock<T extends IAudioContext | IMinimalAudioContext>
    extends AudioNodeMock<T>
    implements IMediaStreamAudioDestinationNode<T>
{
    public stream: MediaStream;

    constructor(context: T) {
        super({
            channelCount: 2,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 0
        });

        this.stream = new MediaStream();

        registrar.addAudioNode(
            context,
            'MediaStreamAudioDestinationNode',
            <T extends IAudioContext | IMinimalAudioContext ? IMediaStreamAudioDestinationNode<T> : never>(<unknown>this)
        );
    }
}

import {
    IAudioContext,
    IMediaStreamAudioSourceNode,
    IMediaStreamAudioSourceOptions,
    IMinimalAudioContext
} from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { registrar } from './registrar';

export class MediaStreamAudioSourceNodeMock<T extends IAudioContext | IMinimalAudioContext>
    extends AudioNodeMock<T>
    implements IMediaStreamAudioSourceNode<T>
{
    public mediaStream: MediaStream;

    constructor(context: T, { mediaStream }: IMediaStreamAudioSourceOptions) {
        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this.mediaStream = mediaStream;

        registrar.addAudioNode(
            context,
            'MediaStreamAudioSourceNode',
            <T extends IAudioContext | IMinimalAudioContext ? IMediaStreamAudioSourceNode<T> : never>(<unknown>this)
        );
    }
}

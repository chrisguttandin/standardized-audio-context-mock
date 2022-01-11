import {
    IAudioContext,
    IMediaElementAudioSourceNode,
    IMediaElementAudioSourceOptions,
    IMinimalAudioContext
} from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { registrar } from './registrar';

export class MediaElementAudioSourceNodeMock<T extends IAudioContext | IMinimalAudioContext>
    extends AudioNodeMock<T>
    implements IMediaElementAudioSourceNode<T>
{
    public mediaElement: HTMLMediaElement;

    constructor(context: T, { mediaElement }: IMediaElementAudioSourceOptions) {
        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this.mediaElement = mediaElement;

        registrar.addAudioNode(
            context,
            'MediaElementAudioSourceNode',
            <T extends IAudioContext | IMinimalAudioContext ? IMediaElementAudioSourceNode<T> : never>(<unknown>this)
        );
    }
}

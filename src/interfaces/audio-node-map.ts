import {
    IAudioBufferSourceNode,
    IAudioContext,
    IDynamicsCompressorNode,
    IGainNode,
    IMediaElementAudioSourceNode,
    IMinimalAudioContext,
    IOscillatorNode,
    IStereoPannerNode,
    TContext
} from 'standardized-audio-context';

export interface IAudioNodeMap<T extends TContext> {
    AudioBufferSourceNode: IAudioBufferSourceNode<T>;

    DynamicsCompressorNode: IDynamicsCompressorNode<T>;

    GainNode: IGainNode<T>;

    MediaElementAudioSourceNode: T extends IAudioContext | IMinimalAudioContext ? IMediaElementAudioSourceNode<T> : never;

    OscillatorNode: IOscillatorNode<T>;

    StereoPannerNode: IStereoPannerNode<T>;
}

import {
    IAudioBufferSourceNode,
    IAudioContext,
    IBiquadFilterNode,
    IDynamicsCompressorNode,
    IGainNode,
    IMediaElementAudioSourceNode,
    IMediaStreamAudioDestinationNode,
    IMediaStreamAudioSourceNode,
    IMinimalAudioContext,
    IOscillatorNode,
    IStereoPannerNode,
    TContext
} from 'standardized-audio-context';

export interface IAudioNodeMap<T extends TContext> {
    AudioBufferSourceNode: IAudioBufferSourceNode<T>;

    BiquadFilterNode: IBiquadFilterNode<T>;

    DynamicsCompressorNode: IDynamicsCompressorNode<T>;

    GainNode: IGainNode<T>;

    MediaElementAudioSourceNode: T extends IAudioContext | IMinimalAudioContext ? IMediaElementAudioSourceNode<T> : never;

    MediaStreamAudioDestinationNode: T extends IAudioContext | IMinimalAudioContext ? IMediaStreamAudioDestinationNode<T> : never;

    MediaStreamAudioSourceNode: T extends IAudioContext | IMinimalAudioContext ? IMediaStreamAudioSourceNode<T> : never;

    OscillatorNode: IOscillatorNode<T>;

    StereoPannerNode: IStereoPannerNode<T>;
}

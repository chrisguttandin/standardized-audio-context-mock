import {
    IAnalyserNode,
    IAudioBuffer,
    IAudioBufferSourceNode,
    IAudioContext,
    IAudioContextOptions,
    IAudioDestinationNode,
    IAudioListener,
    IAudioNode,
    IAudioWorklet,
    IBiquadFilterNode,
    IConstantSourceNode,
    IConvolverNode,
    IDelayNode,
    IDynamicsCompressorNode,
    IGainNode,
    IIIRFilterNode,
    IMediaElementAudioSourceNode,
    IMediaStreamAudioDestinationNode,
    IMediaStreamAudioSourceNode,
    IMediaStreamTrackAudioSourceNode,
    IOscillatorNode,
    IPannerNode,
    IPeriodicWave,
    IStereoPannerNode,
    IWaveShaperNode,
    TAudioContextState,
    TContext,
    TEventHandler
} from 'standardized-audio-context';
import { DeLorean } from 'vehicles';
import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { BiquadFilterNodeMock } from './biquad-filter-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { EventTarget } from './event-target';
import { GainNodeMock } from './gain-node-mock';
import { MediaElementAudioSourceNodeMock } from './media-element-audio-source-node-mock';
import { MediaStreamAudioDestinationNodeMock } from './media-stream-audio-destination-node-mock';
import { MediaStreamAudioSourceNodeMock } from './media-stream-audio-source-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { PannerNodeMock } from './panner-node-mock';
import { registrar } from './registrar';
import { StereoPannerNodeMock } from './stereo-panner-node-mock';

export class AudioContextMock extends EventTarget implements IAudioContext {
    private _deLorean: DeLorean;

    private _onstatechange: null | TEventHandler<IAudioContext>;

    private _options: IAudioContextOptions;

    private _state: TAudioContextState;

    constructor(options: IAudioContextOptions = {}) {
        super();

        this._deLorean = new DeLorean();
        this._onstatechange = null;
        this._options = options;
        this._state = <TAudioContextState>'suspended';

        registrar.setDeLorean(<TContext>this, this._deLorean);
    }

    get audioWorklet(): IAudioWorklet {
        return <IAudioWorklet>{};
    }

    get baseLatency(): number {
        return 512 / this.sampleRate;
    }

    get currentTime(): number {
        return this._deLorean.position;
    }

    get destination(): IAudioDestinationNode<IAudioContext> {
        return <IAudioDestinationNode<IAudioContext>>{};
    }

    get listener(): IAudioListener {
        return <IAudioListener>{};
    }

    get onstatechange(): null | TEventHandler<IAudioContext> {
        return this._onstatechange;
    }

    set onstatechange(value) {
        this._onstatechange = typeof value === 'function' ? value : null;
    }

    get sampleRate(): number {
        return this._options.sampleRate === undefined ? 44100 : this._options.sampleRate;
    }

    get state(): TAudioContextState {
        return this._state;
    }

    public close(): Promise<void> {
        this._state = <TAudioContextState>'closed';

        return Promise.resolve();
    }

    // @todo This is a lazy hack.
    public createAnalyser(): IAnalyserNode<IAudioContext> {
        const analyserNode = new GainNodeMock(this);

        (<any>analyserNode).fftSize = 2048;

        return <IAnalyserNode<IAudioContext>>(<any>analyserNode);
    }

    public createBiquadFilter(): IBiquadFilterNode<IAudioContext> {
        return new BiquadFilterNodeMock(this);
    }

    public createBuffer(numberOfChannels: number, length: number, sampleRate: number): IAudioBuffer {
        return new AudioBufferMock({
            length,
            numberOfChannels,
            sampleRate
        });
    }

    public createBufferSource(): IAudioBufferSourceNode<IAudioContext> {
        return new AudioBufferSourceNodeMock(this);
    }

    public createChannelMerger(): IAudioNode<IAudioContext> {
        // @todo
        return <IAudioNode<IAudioContext>>{};
    }

    public createChannelSplitter(): IAudioNode<IAudioContext> {
        // @todo
        return <IAudioNode<IAudioContext>>{};
    }

    public createConstantSource(): IConstantSourceNode<IAudioContext> {
        // @todo
        return <IConstantSourceNode<IAudioContext>>{};
    }

    public createConvolver(): IConvolverNode<IAudioContext> {
        // @todo
        return <IConvolverNode<IAudioContext>>{};
    }

    public createDelay(): IDelayNode<IAudioContext> {
        // @todo
        return <IDelayNode<IAudioContext>>{};
    }

    public createDynamicsCompressor(): IDynamicsCompressorNode<IAudioContext> {
        return new DynamicsCompressorNodeMock(this);
    }

    public createGain(): IGainNode<IAudioContext> {
        return new GainNodeMock(this);
    }

    public createIIRFilter(): IIIRFilterNode<IAudioContext> {
        // @todo
        return <IIIRFilterNode<IAudioContext>>{};
    }

    public createMediaElementSource(mediaElement: HTMLMediaElement): IMediaElementAudioSourceNode<this> {
        return new MediaElementAudioSourceNodeMock(this, { mediaElement });
    }

    public createMediaStreamDestination(): IMediaStreamAudioDestinationNode<this> {
        return new MediaStreamAudioDestinationNodeMock(this);
    }

    public createMediaStreamSource(mediaStream: MediaStream): IMediaStreamAudioSourceNode<this> {
        return new MediaStreamAudioSourceNodeMock(this, { mediaStream });
    }

    public createMediaStreamTrackSource(): IMediaStreamTrackAudioSourceNode<this> {
        // @todo
        return <IMediaStreamTrackAudioSourceNode<this>>{};
    }

    public createOscillator(): IOscillatorNode<IAudioContext> {
        return new OscillatorNodeMock(this);
    }

    public createPanner(): IPannerNode<IAudioContext> {
        return new PannerNodeMock(this);
    }

    public createPeriodicWave(): IPeriodicWave {
        // @todo
        return <IPeriodicWave>{};
    }

    public createStereoPanner(): IStereoPannerNode<IAudioContext> {
        return new StereoPannerNodeMock(this);
    }

    public createWaveShaper(): IWaveShaperNode<IAudioContext> {
        // @todo
        return <IWaveShaperNode<IAudioContext>>{};
    }

    public decodeAudioData(): Promise<IAudioBuffer> {
        return Promise.resolve(new AudioBufferMock({ length: 10, sampleRate: this.sampleRate }));
    }

    public resume(): Promise<void> {
        this._state = <TAudioContextState>'running';

        return Promise.resolve();
    }

    public suspend(): Promise<void> {
        this._state = <TAudioContextState>'suspended';

        return Promise.resolve();
    }
}

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
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { EventTarget } from './event-target';
import { GainNodeMock } from './gain-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

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
        // @todo
        return <IBiquadFilterNode<IAudioContext>>(<any>{
            Q: {
                value: 0
            },
            connect(): void {}, // tslint:disable-line:no-empty
            frequency: {
                value: 0
            },
            gain: {
                value: 0
            }
        });
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

    public createMediaElementSource(): IMediaElementAudioSourceNode<this> {
        // @todo
        return <IMediaElementAudioSourceNode<this>>{};
    }

    public createMediaStreamDestination(): IMediaStreamAudioDestinationNode<this> {
        // @todo
        return <IMediaStreamAudioDestinationNode<this>>{};
    }

    public createMediaStreamSource(): IMediaStreamAudioSourceNode<this> {
        // @todo
        return <IMediaStreamAudioSourceNode<this>>{};
    }

    public createMediaStreamTrackSource(): IMediaStreamTrackAudioSourceNode<this> {
        // @todo
        return <IMediaStreamTrackAudioSourceNode<this>>{};
    }

    public createOscillator(): IOscillatorNode<IAudioContext> {
        return new OscillatorNodeMock(this);
    }

    public createPanner(): IPannerNode<IAudioContext> {
        // @todo
        return <IPannerNode<IAudioContext>>{};
    }

    public createPeriodicWave(): IPeriodicWave {
        // @todo
        return <IPeriodicWave>{};
    }

    public createStereoPanner(): IStereoPannerNode<IAudioContext> {
        // @todo
        return <IStereoPannerNode<IAudioContext>>{};
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

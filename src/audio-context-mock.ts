import {
    IAnalyserNode,
    IAudioBuffer,
    IAudioBufferSourceNode,
    IAudioContext,
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
    IMediaStreamAudioSourceNode,
    IOscillatorNode,
    IPannerNode,
    IPeriodicWave,
    IStateChangeEventHandler,
    IStereoPannerNode,
    IWaveShaperNode,
    TAudioContextState
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

    constructor () {
        super();

        this._deLorean = new DeLorean();

        registrar.setDeLorean(this, this._deLorean);
    }

    get audioWorklet (): IAudioWorklet {
        return <IAudioWorklet> { };
    }

    get baseLatency (): number {
        return 512 / 44100;
    }

    get currentTime (): number {
        return this._deLorean.position;
    }

    get destination (): IAudioDestinationNode<this> {
        return <IAudioDestinationNode<this>> { };
    }

    get listener (): IAudioListener {
        return <IAudioListener> { };
    }

    get onstatechange (): null | IStateChangeEventHandler<this> {
        return null;
    }

    get sampleRate (): number {
        return 44100;
    }

    get state (): TAudioContextState {
        return <TAudioContextState> 'running';
    }

    public close (): Promise<void> {
        return Promise.resolve();
    }

    // @todo This is a lazy hack.
    public createAnalyser (): IAnalyserNode<this> {
        const analyserNode = new GainNodeMock(this);

        (<any> analyserNode).fftSize = 2048;

        return <IAnalyserNode<this>> (<any> analyserNode);
    }

    public createBiquadFilter (): IBiquadFilterNode<this> {
        // @todo
        return <IBiquadFilterNode<this>> (<any> {
            Q: {
                value: 0
            },
            connect (): void { }, // tslint:disable-line:no-empty
            frequency: {
                value: 0
            },
            gain: {
                value: 0
            }
        });
    }

    public createBuffer (numberOfChannels: number, length: number, sampleRate: number): IAudioBuffer {
        return new AudioBufferMock({
            length,
            numberOfChannels,
            sampleRate
        });
    }

    public createBufferSource (): IAudioBufferSourceNode<this> {
        const audioBufferSourceNode = new AudioBufferSourceNodeMock(this);

        registrar.addAudioNode(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    public createChannelMerger (): IAudioNode<this> {
        // @todo
        return <IAudioNode<this>> { };
    }

    public createChannelSplitter (): IAudioNode<this> {
        // @todo
        return <IAudioNode<this>> { };
    }

    public createConstantSource (): IConstantSourceNode<this> {
        // @todo
        return <IConstantSourceNode<this>> { };
    }

    public createConvolver (): IConvolverNode<this> {
        // @todo
        return <IConvolverNode<this>> { };
    }

    public createDelay (): IDelayNode<this> {
        // @todo
        return <IDelayNode<this>> { };
    }

    public createDynamicsCompressor (): IDynamicsCompressorNode<this> {
        const dynamicsCompressorNode = new DynamicsCompressorNodeMock(this);

        registrar.addAudioNode(this, 'DynamicsCompressorNode', dynamicsCompressorNode);

        return dynamicsCompressorNode;
    }

    public createGain (): IGainNode<this> {
        const gainNode = new GainNodeMock(this);

        registrar.addAudioNode(this, 'GainNode', gainNode);

        return gainNode;
    }

    public createIIRFilter (): IIIRFilterNode<this> {
        // @todo
        return <IIIRFilterNode<this>> { };
    }

    public createMediaElementSource (): IMediaElementAudioSourceNode<this> {
        // @todo
        return <IMediaElementAudioSourceNode<this>> { };
    }

    public createMediaStreamSource (): IMediaStreamAudioSourceNode<this> {
        // @todo
        return <IMediaStreamAudioSourceNode<this>> { };
    }

    public createOscillator (): IOscillatorNode<this> {
        const oscillatorNode = new OscillatorNodeMock(this);

        registrar.addAudioNode(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    public createPanner (): IPannerNode<this> {
        // @todo
        return <IPannerNode<this>> { };
    }

    public createPeriodicWave (): IPeriodicWave {
        // @todo
        return <IPeriodicWave> { };
    }

    public createStereoPanner (): IStereoPannerNode<this> {
        // @todo
        return <IStereoPannerNode<this>> { };
    }

    public createWaveShaper (): IWaveShaperNode<this> {
        // @todo
        return <IWaveShaperNode<this>> { };
    }

    public decodeAudioData (): Promise<IAudioBuffer> {
        return <Promise<IAudioBuffer>> (<any> Promise.resolve());
    }

    public resume (): Promise<void> {
        return Promise.resolve();
    }

    public suspend (): Promise<void> {
        return Promise.resolve();
    }

}

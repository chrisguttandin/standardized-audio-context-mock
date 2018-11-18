import {
    IAnalyserNode,
    IAudioBuffer,
    IAudioContext,
    IAudioDestinationNode,
    IAudioNode,
    IAudioWorklet,
    IBiquadFilterNode,
    IConstantSourceNode,
    IIIRFilterNode,
    IMediaElementAudioSourceNode,
    IMediaStreamAudioSourceNode,
    IStereoPannerNode,
    IWaveShaperNode,
    TAudioContextState,
    TStateChangeEventHandler
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

    get currentTime (): number {
        return this._deLorean.position;
    }

    get destination (): IAudioDestinationNode {
        return <IAudioDestinationNode> {};
    }

    get onstatechange (): null | TStateChangeEventHandler {
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
    public createAnalyser (): IAnalyserNode {
        const analyserNode = new GainNodeMock(this);

        (<any> analyserNode).fftSize = 2048;

        return <IAnalyserNode> (<any> analyserNode);
    }

    public createBiquadFilter (): IBiquadFilterNode {
        // @todo
        return <IBiquadFilterNode> (<any> {
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

    public createBufferSource (): AudioBufferSourceNodeMock {
        const audioBufferSourceNode = new AudioBufferSourceNodeMock(this);

        registrar.addAudioNode(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    public createChannelMerger (): IAudioNode {
        // @todo
        return <IAudioNode> { };
    }

    public createChannelSplitter (): IAudioNode {
        // @todo
        return <IAudioNode> { };
    }

    public createConstantSource (): IConstantSourceNode {
        // @todo
        return <IConstantSourceNode> { };
    }

    public createDynamicsCompressor (): DynamicsCompressorNodeMock {
        const dynamicsCompressorNode = new DynamicsCompressorNodeMock(this);

        registrar.addAudioNode(this, 'DynamicsCompressorNode', dynamicsCompressorNode);

        return dynamicsCompressorNode;
    }

    public createGain (): GainNodeMock {
        const gainNode = new GainNodeMock(this);

        registrar.addAudioNode(this, 'GainNode', gainNode);

        return gainNode;
    }

    public createIIRFilter (): IIIRFilterNode {
        // @todo
        return <IIIRFilterNode> { };
    }

    public createMediaElementSource (): IMediaElementAudioSourceNode {
        // @todo
        return <IMediaElementAudioSourceNode> { };
    }

    public createMediaStreamSource (): IMediaStreamAudioSourceNode {
        // @todo
        return <IMediaStreamAudioSourceNode> { };
    }

    public createOscillator (): OscillatorNodeMock {
        const oscillatorNode = new OscillatorNodeMock(this);

        registrar.addAudioNode(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    public createStereoPanner (): IStereoPannerNode {
        // @todo
        return <IStereoPannerNode> { };
    }

    public createWaveShaper (): IWaveShaperNode {
        // @todo
        return <IWaveShaperNode> { };
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

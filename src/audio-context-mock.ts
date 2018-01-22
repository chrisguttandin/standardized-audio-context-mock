import {
    IAnalyserNode,
    IAudioBuffer,
    IAudioContext,
    IAudioDestinationNode,
    IAudioNode,
    IBiquadFilterNode,
    IIIRFilterNode,
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

    get currentTime () {
        return this._deLorean.position;
    }

    get destination () {
        return <IAudioDestinationNode> {};
    }

    get onstatechange () {
        return null;
    }

    get sampleRate () {
        return 44100;
    }

    get state () {
        return <TAudioContextState> 'running';
    }

    public close () {
        return Promise.resolve();
    }

    // @todo This is a lazy hack.
    public createAnalyser () {
        const analyserNode = new GainNodeMock(this);

        (<any> analyserNode).fftSize = 2048;

        return <IAnalyserNode> (<any> analyserNode);
    }

    public createChannelMerger () {
        // @todo
        return <IAudioNode> { };
    }

    public createChannelSplitter () {
        // @todo
        return <IAudioNode> { };
    }

    public createBiquadFilter () {
        // @todo
        return <IBiquadFilterNode> (<any> {
            Q: {
                value: 0
            },
            connect () { }, // tslint:disable-line:no-empty
            frequency: {
                value: 0
            },
            gain: {
                value: 0
            }
        });
    }

    public createBuffer (numberOfChannels: number, length: number, sampleRate: number) {
        return new AudioBufferMock({
            length,
            numberOfChannels,
            sampleRate
        });
    }

    public createBufferSource () {
        const audioBufferSourceNode = new AudioBufferSourceNodeMock(this);

        registrar.addAudioNode(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    public createGain () {
        const gainNode = new GainNodeMock(this);

        registrar.addAudioNode(this, 'GainNode', gainNode);

        return gainNode;
    }

    public createDynamicsCompressor () {
        const dynamicsCompressorNode = new DynamicsCompressorNodeMock(this);

        registrar.addAudioNode(this, 'DynamicsCompressorNode', dynamicsCompressorNode);

        return dynamicsCompressorNode;
    }

    public createIIRFilter () {
        // @todo
        return <IIIRFilterNode> { };
    }

    public createOscillator () {
        const oscillatorNode = new OscillatorNodeMock(this);

        registrar.addAudioNode(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    public decodeAudioData () {
        return <Promise<IAudioBuffer>> (<any> Promise.resolve());
    }

    public resume () {
        return Promise.resolve();
    }

    public suspend () {
        return Promise.resolve();
    }

}

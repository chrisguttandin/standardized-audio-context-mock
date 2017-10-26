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
import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { EventTarget } from './event-target';
import { DeLorean } from 'vehicles';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
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

    close () {
        return Promise.resolve();
    }

    // @todo This is a lazy hack.
    createAnalyser () {
        const analyserNode = new GainNodeMock(this);

        (<any> analyserNode).fftSize = 2048;

        return <IAnalyserNode> (<any> analyserNode);
    }

    createChannelMerger () {
        // @todo
        return <IAudioNode> { };
    }

    createChannelSplitter () {
        // @todo
        return <IAudioNode> { };
    }

    createBiquadFilter () {
        // @todo
        return <IBiquadFilterNode> (<any> {
            Q: {
                value: 0
            },
            connect: () => {},
            frequency: {
                value: 0
            },
            gain: {
                value: 0
            }
        });
    }

    createBuffer (numberOfChannels: number, length: number, sampleRate: number) {
        return new AudioBufferMock({
            length,
            numberOfChannels,
            sampleRate
        });
    }

    createBufferSource () {
        const audioBufferSourceNode = new AudioBufferSourceNodeMock(this);

        registrar.addAudioNode(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    createGain () {
        const gainNode = new GainNodeMock(this);

        registrar.addAudioNode(this, 'GainNode', gainNode);

        return gainNode;
    }

    createDynamicsCompressor () {
        const dynamicsCompressorNode = new DynamicsCompressorNodeMock(this);

        registrar.addAudioNode(this, 'DynamicsCompressorNode', dynamicsCompressorNode);

        return dynamicsCompressorNode;
    }

    createIIRFilter () {
        // @todo
        return <IIIRFilterNode> { };
    }

    createOscillator () {
        const oscillatorNode = new OscillatorNodeMock(this);

        registrar.addAudioNode(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    decodeAudioData () {
        return <Promise<IAudioBuffer>> (<any> Promise.resolve());
    }

}

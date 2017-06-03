import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { GainNodeMock } from './gain-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

export class AudioContextMock {

    private _scheduler: AudioEventScheduler;

    constructor () {
        this._scheduler = new AudioEventScheduler();

        registrar.setScheduler(this, this._scheduler);
    }

    get currentTime () {
        return this._scheduler.currentTime;
    }

    // destination

    close () {}

    // @todo This is a lazy hack.
    createAnalyser () {
        const analyserNode = new GainNodeMock(this);

        (<any> analyserNode).fftSize = 2048;

        return analyserNode;
    }

    createBiquadFilter () {
        // @todo
        return {
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
        };
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

    createOscillator () {
        const oscillatorNode = new OscillatorNodeMock(this);

        registrar.addAudioNode(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    // decodeAudioData

}

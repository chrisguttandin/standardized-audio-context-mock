import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { GainNodeMock } from './gain-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

export class AudioContextMock {

    constructor () {
        this._scheduler = new AudioEventScheduler();
    }

    get currentTime () {
        return this._scheduler.currentTime;
    }

    // destination

    close () {} // eslint-disable-line class-methods-use-this

    // @todo This is a lazy hack.
    createAnalyser () {
        const analyserNode = new GainNodeMock({
            scheduler: this._scheduler
        });

        analyserNode.fftSize = 2048;

        return analyserNode;
    }

    createBiquadFilter () { // eslint-disable-line class-methods-use-this
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

    createBuffer (numberOfChannels, length, sampleRate) { // eslint-disable-line class-methods-use-this
        return new AudioBufferMock({
            length,
            numberOfChannels,
            sampleRate
        });
    }

    createBufferSource () {
        const audioBufferSourceNode = new AudioBufferSourceNodeMock({
            scheduler: this._scheduler
        });

        registrar.add(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    createGain () {
        const gainNode = new GainNodeMock({
            scheduler: this._scheduler
        });

        registrar.add(this, 'GainNode', gainNode);

        return gainNode;
    }

    createDynamicsCompressor () {
        const dynamicsCompressorNode = new DynamicsCompressorNodeMock({
            scheduler: this._scheduler
        });

        registrar.add(this, 'DynamicsCompressorNode', dynamicsCompressorNode);

        return dynamicsCompressorNode;
    }

    createOscillator () {
        const oscillatorNode = new OscillatorNodeMock({
            scheduler: this._scheduler
        });

        registrar.add(this, 'OscillatorNode', oscillatorNode);

        return oscillatorNode;
    }

    // decodeAudioData

    flush (elapsedTime) {
        this._scheduler.flush(elapsedTime);
    }

    reset () {
        registrar.reset(this);
        this._scheduler.reset();
    }

}

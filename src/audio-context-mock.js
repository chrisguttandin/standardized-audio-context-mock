import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';
import { GainNodeMock } from './gain-node-mock';
import { registrar } from './registrar';

export class AudioContextMock {

    constructor () {
        this._scheduler = new AudioEventScheduler();
    }

    get currentTime () {
        return this._scheduler.currentTime;
    }

    // destination

    close () {}

    // @todo This is a lazy hack.
    createAnalyser () {
        /* eslint-disable indent */
        var analyserNode = new GainNodeMock({
                scheduler: this._scheduler
            });
        /* eslint-enable indent */

        analyserNode.fftSize = 2048;

        return analyserNode;
    }

    createBiquadFilter () {
        // @todo
        return {
            connect: () => {},
            gain: {
                value: 0
            },
            frequency: {
                value: 0
            },
            Q: {
                value: 0
            }
        };
    }

    createBuffer (numberOfChannels, length, sampleRate) {
        return new AudioBufferMock({
            length: length,
            numberOfChannels: numberOfChannels,
            sampleRate: sampleRate
        });
    }

    createBufferSource () {
        /* eslint-disable indent */
        var audioBufferSourceNode = new AudioBufferSourceNodeMock({
                scheduler: this._scheduler
            });
        /* eslint-enable indent */

        registrar.add(this, 'AudioBufferSourceNode', audioBufferSourceNode);

        return audioBufferSourceNode;
    }

    createGain () {
        /* eslint-disable indent */
        var gainNode = new GainNodeMock({
                scheduler: this._scheduler
            });
        /* eslint-enable indent */

        registrar.add(this, 'GainNode', gainNode);

        return gainNode;
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

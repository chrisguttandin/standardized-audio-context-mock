import { IAudioBuffer } from 'standardized-audio-context';

export class AudioBufferMock implements IAudioBuffer {

    public length: number;

    public numberOfChannels: number;

    public sampleRate: number;

    constructor (options: { length: number, numberOfChannels: number, sampleRate: number }) {
        this.length = options.length;
        this.numberOfChannels = options.numberOfChannels;
        this.sampleRate = options.sampleRate;
    }

    get duration () {
        return this.length / this.sampleRate;
    }

    copyFromChannel () {}

    copyToChannel () {}

    getChannelData () {
        return new Float32Array([]);
    }

}

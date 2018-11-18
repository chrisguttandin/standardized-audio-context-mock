import { IAudioBuffer } from 'standardized-audio-context';

export class AudioBufferMock implements IAudioBuffer {

    public length: number;

    public numberOfChannels: number;

    public sampleRate: number;

    constructor (options: { length: number, numberOfChannels: number, sampleRate: number }) {
        this.length = options.length;
        this.numberOfChannels = options.numberOfChannels;
        this.sampleRate = options.sampleRate;
    }

    get duration (): number {
        return this.length / this.sampleRate;
    }

    public copyFromChannel (): void { } // tslint:disable-line:no-empty

    public copyToChannel (): void { } // tslint:disable-line:no-empty

    public getChannelData (): Float32Array {
        return new Float32Array([]);
    }

}

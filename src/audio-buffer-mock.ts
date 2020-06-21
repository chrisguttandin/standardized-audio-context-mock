import { IAudioBuffer, IAudioBufferOptions } from 'standardized-audio-context';

export class AudioBufferMock implements IAudioBuffer {
    public length: number;

    public numberOfChannels: number;

    public sampleRate: number;

    constructor({ length, numberOfChannels = 1, sampleRate }: IAudioBufferOptions) {
        this.length = length;
        this.numberOfChannels = numberOfChannels;
        this.sampleRate = sampleRate;
    }

    get duration(): number {
        return this.length / this.sampleRate;
    }

    public copyFromChannel(): void {} // tslint:disable-line:no-empty

    public copyToChannel(): void {} // tslint:disable-line:no-empty

    public getChannelData(): Float32Array {
        return new Float32Array([]);
    }
}

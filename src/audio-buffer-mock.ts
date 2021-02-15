import { IAudioBuffer, IAudioBufferOptions } from 'standardized-audio-context';

export class AudioBufferMock implements IAudioBuffer {
    public length: number;

    public numberOfChannels: number;

    public sampleRate: number;

    private channelData: Float32Array[];

    constructor({ length, numberOfChannels = 1, sampleRate }: IAudioBufferOptions) {
        this.length = length;
        this.numberOfChannels = numberOfChannels;
        this.sampleRate = sampleRate;
        this.channelData = [];
        for (let i = 0; i < this.numberOfChannels; i++) {
            this.channelData.push(new Float32Array(this.length));
        }
    }

    get duration(): number {
        return this.length / this.sampleRate;
    }

    public copyFromChannel(): void {} // tslint:disable-line:no-empty

    public copyToChannel(): void {} // tslint:disable-line:no-empty

    public getChannelData(channelNo): Float32Array {
        return this.channelData[channelNo];
    }
}

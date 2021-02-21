import { IAudioBuffer, IAudioBufferOptions } from 'standardized-audio-context';

export class AudioBufferMock implements IAudioBuffer {
    public length: number;

    public numberOfChannels: number;

    public sampleRate: number;

    private channelData: Map<number, Float32Array>;

    constructor({ length, numberOfChannels = 1, sampleRate }: IAudioBufferOptions) {
        this.channelData = new Map();
        this.length = length;
        this.numberOfChannels = numberOfChannels;
        this.sampleRate = sampleRate;
    }

    get duration(): number {
        return this.length / this.sampleRate;
    }

    public copyFromChannel(): void {} // tslint:disable-line:no-empty

    public copyToChannel(): void {} // tslint:disable-line:no-empty

    public getChannelData(channel: number): Float32Array {
        let channelData = this.channelData.get(channel);

        if (channelData === undefined) {
            channelData = new Float32Array(this.length);

            this.channelData.set(channel, channelData);
        }

        return channelData;
    }
}

export class AudioBufferMock {

    constructor (options) {
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
      return [];
    }

}

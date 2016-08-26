export class AudioBufferMock {

    constructor (options) {
        this.length = options.length;
        this.numberOfChannels = options.numberOfChannels;
        this.sampleRate = options.sampleRate;
    }

    get duration () {
        return this.length / this.sampleRate;
    }

    copyFromChannel () {} // eslint-disable-line class-methods-use-this

    copyToChannel () {} // eslint-disable-line class-methods-use-this

    getChannelData () { // eslint-disable-line class-methods-use-this
        return [];
    }

}

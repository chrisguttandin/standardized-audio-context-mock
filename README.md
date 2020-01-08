# standardized-audio-context-mock

[![tests](https://img.shields.io/travis/chrisguttandin/standardized-audio-context-mock/master.svg?style=flat-square)](https://travis-ci.org/chrisguttandin/standardized-audio-context-mock)
[![dependencies](https://img.shields.io/david/chrisguttandin/standardized-audio-context-mock.svg?style=flat-square)](https://www.npmjs.com/package/standardized-audio-context-mock)
[![version](https://img.shields.io/npm/v/standardized-audio-context-mock.svg?style=flat-square)](https://www.npmjs.com/package/standardized-audio-context-mock)

**A mocked version of the [standardized-audio-context](https://github.com/chrisguttandin/standardized-audio-context) module.**

This library is meant to test code that uses [`standardized-audio-context`](https://github.com/chrisguttandin/standardized-audio-context). It can be used with popular JavaScript testing frameworks ([Jest](https://jestjs.io/), [Mocha](https://mochajs.org), [Chai](https://www.chaijs.com), etc) 


It does depend on [Sinon.JS](https://sinonjs.org) to do the mocking.

## Installing

`standardized-audio-context-mock` is published on
[npm](https://www.npmjs.com/package/standardized-audio-context-mock) and can be installed as usual.

```shell
npm install standardized-audio-context-mock
```

## Usage

Let's say you have the following code that you want to test:

```typescript
import { IAudioBuffer, IAudioContext } from 'standardized-audio-context';

const play = (audioBuffer: IAudioBuffer, audioContext: IAudioContext) => {
    const audioBufferSourceNode = audioContext.createBufferSource();

    audioBufferSourceNode.buffer = audioBuffer;
    audioBufferSourceNode.connect(audioContext.destination);

    audioBufferSourceNode.start();
};
```

A test suite for the `play()` function which will run with your favorite JavaScript test framework, and might look something like this:

```js
import { AudioBufferMock, AudioContextMock, registrar } from 'standardized-audio-context-mock';

describe('play()', () => {

    let audioBufferMock;
    let audioContextMock;

    afterEach(() => registrar.reset());

    beforeEach(() => {
        audioBufferMock = new AudioBufferMock({ length: 10, sampleRate: 44100 });
        audioContextMock = new AudioContextMock();
    });

    it('should create a new AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        expect(registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode')).to.have.a.lengthOf(1);
    });

    it('should set the buffer property of the AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        const [ audioBufferSourceNodeMock ] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.buffer).to.equal(audioBufferMock);
    });

    it('should connect the AudioBufferSourceNode with to destination', () => {
        play(audioBufferMock, audioContextMock);

        const [ audioBufferSourceNodeMock ] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.connect).to.have.been.calledOnce;
        expect(audioBufferSourceNodeMock.connect).to.have.been.calledWithExactly(audioContextMock.destination);
    });

    it('should start the AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        const [ audioBufferSourceNodeMock ] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.start).to.have.been.calledOnce;
    });

});
```

## Scripts

### npm run prepublishOnly

This script pulls and builds [`standardized-audio-context`](https://github.com/chrisguttandin/standardized-audio-context)

### npm run test

Validates mock code of [`standardized-audio-context`](https://github.com/chrisguttandin/standardized-audio-context). Run `npm run prepublishOnly` prior to running this script to pull and build `standardized-audio-context`](https://github.com/chrisguttandin/standardized-audio-context).

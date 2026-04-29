# standardized-audio-context-mock

**A mocked version of the standardized-audio-context module.**

[![version](https://img.shields.io/npm/v/standardized-audio-context-mock.svg?style=flat-square)](https://www.npmjs.com/package/standardized-audio-context-mock)

This library is meant to test code which is using [`standardized-audio-context`](https://github.com/chrisguttandin/standardized-audio-context) without actually rendering any audio.

## Usage

`standardized-audio-context-mock` is published on
[npm](https://www.npmjs.com/package/standardized-audio-context-mock) and can be installed as usual.

```shell
npm install standardized-audio-context-mock
```

## Testing

Let's say you have the following code that you want to test:

```typescript
// File `./play.ts`
import { IAudioBuffer, IAudioContext } from 'standardized-audio-context';

export const play = (audioBuffer: IAudioBuffer, audioContext: IAudioContext) => {
    const audioBufferSourceNode = audioContext.createBufferSource();

    audioBufferSourceNode.buffer = audioBuffer;
    audioBufferSourceNode.connect(audioContext.destination);

    audioBufferSourceNode.start();
};
```

A test suite for the `play()` function which will run with [Mocha](https://mochajs.org) and [Chai](https://www.chaijs.com) and uses `standardized-audio-context-mock` might look like this:

```js
// File `./play.test.js`
import { AudioBuffer, AudioContext, registrar } from 'standardized-audio-context-mock';
import { play } from './play';

describe('play()', () => {
    let audioBufferMock;
    let audioContextMock;

    afterEach(() => registrar.reset());

    beforeEach(() => {
        audioBufferMock = new AudioBuffer({ length: 10, sampleRate: 44100 });
        audioContextMock = new AudioContext();
    });

    it('should create a new AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        expect(registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode')).to.have.a.lengthOf(1);
    });

    it('should set the buffer property of the AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        const [audioBufferSourceNodeMock] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.buffer).to.equal(audioBufferMock);
    });

    it('should connect the AudioBufferSourceNode to destination', () => {
        play(audioBufferMock, audioContextMock);

        const [audioBufferSourceNodeMock] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.connect).to.have.been.calledOnce;
        expect(audioBufferSourceNodeMock.connect).to.have.been.calledWithExactly(audioContextMock.destination);
    });

    it('should start the AudioBufferSourceNode', () => {
        play(audioBufferMock, audioContextMock);

        const [audioBufferSourceNodeMock] = registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode');

        expect(audioBufferSourceNodeMock.start).to.have.been.calledOnce;
    });
});
```

## Mocking

By default this library is not using any specific mocking library anymore. (Earlier versions only worked with [Sinon.JS](https://sinonjs.org).)

However it is possible to provide any third party mocking implementation. You can use `setMockingImplementation()` for doing that. `resetMockingImplementation()` is restoring the default behavior.

### Example: using Sinon.JS

If you want to use Sinon.JS (like older versions of this package provided automatically), you can configure it like this:

```js
import { setMockingImplementation, resetMockingImplementation } from 'standardized-audio-context-mock';
import { stub } from 'sinon';

// provide the mocking implementation
setMockingImplementation((defaultImplementation) => stub().callsFake(defaultImplementation));

// run your tests

// reset the mocking implementation
resetMockingImplementation();
```

### Example: using Vitest

It is for example also possible to use Vitest’s `vi.fn()` instead:

```js
import { setMockingImplementation, resetMockingImplementation } from 'standardized-audio-context-mock';
import { vi } from 'vitest';

// provide the mocking implementation
setMockingImplementation((defaultImplementation) => vi.fn().mockImplementation(defaultImplementation));

// run your tests

// reset the mocking implementation
resetMockingImplementation();
```

import { AudioContextMock } from './audio-context-mock';
import { registrar } from './registrar';

module.exports = {

    AudioContext: AudioContextMock,

    isSupported: true,

    registrar

};

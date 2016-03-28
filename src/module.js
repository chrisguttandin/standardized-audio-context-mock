import { AudioContextMock } from './audio-context-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { AudioNodeMock } from './audio-node-mock';
import { registrar } from './registrar';

module.exports = {

    AudioContext: AudioContextMock,
    AudioBufferSourceNode: AudioBufferSourceNodeMock,
    AudioNode: AudioNodeMock,
    DynamicsCompressorNode: DynamicsCompressorNodeMock,
    OscillatorNode: OscillatorNodeMock,

    isSupported: true,

    registrar

};

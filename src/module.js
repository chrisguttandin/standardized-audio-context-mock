import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

export default {

    AudioBufferSourceNode: AudioBufferSourceNodeMock,

    AudioContext: AudioContextMock,

    AudioNode: AudioNodeMock,

    DynamicsCompressorNode: DynamicsCompressorNodeMock,

    OscillatorNode: OscillatorNodeMock,

    isSupported: true,

    registrar

};

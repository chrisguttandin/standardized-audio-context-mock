import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

export { AudioBufferSourceNodeMock as AudioBufferSourceNode };

export { AudioContextMock as AudioContext };

export { AudioNodeMock as AudioNode };

export { DynamicsCompressorNodeMock as DynamicsCompressorNode };

export { OscillatorNodeMock as OscillatorNode };

export const isSupported = () => true;

export { registrar };

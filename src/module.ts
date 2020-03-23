import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { addAudioWorkletModule } from './functions/add-audio-worklet-module';
import { decodeAudioData } from './functions/decode-audio-data';
import { isAnyAudioContext } from './functions/is-any-audio-context';
import { isAnyAudioNode } from './functions/is-any-audio-node';
import { isAnyAudioParam } from './functions/is-any-audio-param';
import { isAnyOfflineAudioContext } from './functions/is-any-offline-audio-context';
import { isSupported } from './functions/is-supported';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { registrar } from './registrar';

export { AudioBufferSourceNodeMock as AudioBufferSourceNode };

export { AudioContextMock as AudioContext };

export { AudioNodeMock as AudioNode };

export { DynamicsCompressorNodeMock as DynamicsCompressorNode };

export { OscillatorNodeMock as OscillatorNode };

export { addAudioWorkletModule };

export { decodeAudioData };

export { isAnyAudioContext };

export { isAnyAudioNode };

export { isAnyAudioParam };

export { isAnyOfflineAudioContext };

export { isSupported };

export { registrar };

import { AnalyserNodeMock } from './analyser-node-mock';
import { AudioBufferMock } from './audio-buffer-mock';
import { AudioBufferSourceNodeMock } from './audio-buffer-source-node-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioWorkletNodeMock } from './audio-worklet-node-mock';
import { BiquadFilterNodeMock } from './biquad-filter-node-mock';
import { ChannelMergerNodeMock } from './channel-merger-node-mock';
import { ChannelSplitterNodeMock } from './channel-splitter-node-mock';
import { ConstantSourceNodeMock } from './constant-source-node-mock';
import { ConvolverNodeMock } from './convolver-node-mock';
import { DelayNodeMock } from './delay-node-mock';
import { DynamicsCompressorNodeMock } from './dynamics-compressor-node-mock';
import { addAudioWorkletModule } from './functions/add-audio-worklet-module';
import { decodeAudioData } from './functions/decode-audio-data';
import { isAnyAudioContext } from './functions/is-any-audio-context';
import { isAnyAudioNode } from './functions/is-any-audio-node';
import { isAnyAudioParam } from './functions/is-any-audio-param';
import { isAnyOfflineAudioContext } from './functions/is-any-offline-audio-context';
import { isSupported } from './functions/is-supported';
import { GainNodeMock } from './gain-node-mock';
import { IIRFilterNodeMock } from './iir-filter-node-mock';
import { MediaElementAudioSourceNodeMock } from './media-element-audio-source-node-mock';
import { MediaStreamAudioDestinationNodeMock } from './media-stream-audio-destination-node-mock';
import { MediaStreamAudioSourceNodeMock } from './media-stream-audio-source-node-mock';
import { MediaStreamTrackAudioSourceNodeMock } from './media-stream-track-audio-source-node-mock';
import { MinimalAudioContextMock } from './minimal-audio-context-mock';
import { MinimalOfflineAudioContextMock } from './minimal-offline-audio-context-mock';
import { OfflineAudioContextMock } from './offline-audio-context-mock';
import { OscillatorNodeMock } from './oscillator-node-mock';
import { PannerNodeMock } from './panner-node-mock';
import { PeriodicWaveMock } from './periodic-wave-mock';
import { registrar } from './registrar';
import { StereoPannerNodeMock } from './stereo-panner-node-mock';
import { WaveShaperNodeMock } from './wave-shaper-node-mock';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

export { AnalyserNodeMock as AnalyserNode };

export { AudioBufferMock as AudioBuffer };

export { AudioBufferSourceNodeMock as AudioBufferSourceNode };

export { AudioContextMock as AudioContext };

export { AudioNodeMock as AudioNode };

export { AudioWorkletNodeMock as AudioWorkletNode };

export { BiquadFilterNodeMock as BiquadFilterNode };

export { ChannelMergerNodeMock as ChannelMergerNode };

export { ChannelSplitterNodeMock as ChannelSplitterNode };

export { ConstantSourceNodeMock as ConstantSourceNode };

export { ConvolverNodeMock as ConvolverNode };

export { DelayNodeMock as DelayNode };

export { DynamicsCompressorNodeMock as DynamicsCompressorNode };

export { GainNodeMock as GainNode };

export { IIRFilterNodeMock as IIRFilterNode };

export { MediaElementAudioSourceNodeMock as MediaElementAudioSourceNode };

export { MediaStreamAudioDestinationNodeMock as MediaStreamAudioDestinationNode };

export { MediaStreamAudioSourceNodeMock as MediaStreamAudioSourceNode };

export { MediaStreamTrackAudioSourceNodeMock as MediaStreamTrackAudioSourceNode };

export { MinimalAudioContextMock as MinimalAudioContext };

export { MinimalOfflineAudioContextMock as MinimalOfflineAudioContext };

export { OfflineAudioContextMock as OfflineAudioContext };

export { OscillatorNodeMock as OscillatorNode };

export { PannerNodeMock as PannerNode };

export { PeriodicWaveMock as PeriodicWave };

export { StereoPannerNodeMock as StereoPannerNode };

export { WaveShaperNodeMock as WaveShaperNode };

export { addAudioWorkletModule };

export { decodeAudioData };

export { isAnyAudioContext };

export { isAnyAudioNode };

export { isAnyAudioParam };

export { isAnyOfflineAudioContext };

export { isSupported };

export { registrar };

import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';

export class Registrar {

    private _audioNodes: WeakMap<AudioContextMock, Map<string, Set<AudioNodeMock>>>;

    private _schedulers: WeakMap<AudioContextMock, AudioEventScheduler>;

    constructor () {
        this._audioNodes = new WeakMap();
        this._schedulers = new WeakMap();
    }

    addAudioNode (context: AudioContextMock, type: string, node: AudioNodeMock) {
        let audioNodesOfContext: Map<string, Set<AudioNodeMock>>;
        let audioNodesOfType: Set<AudioNodeMock>;

        if (this._audioNodes.has(context)) {
            audioNodesOfContext = <Map<string, Set<AudioNodeMock>>> this._audioNodes.get(context);
        } else {
            audioNodesOfContext = new Map();
            this._audioNodes.set(context, audioNodesOfContext);
        }

        if (audioNodesOfContext.has(type)) {
            audioNodesOfType = <Set<AudioNodeMock>> audioNodesOfContext.get(type);
        } else {
            audioNodesOfType = new Set();
            audioNodesOfContext.set(type, audioNodesOfType);
        }

        audioNodesOfType.add(node);
    }

    getAudioNodes (context: AudioContextMock, type: string) {
        if (this._audioNodes.has(context)) {
            const audioNodesOfContext = <Map<string, Set<AudioNodeMock>>> this._audioNodes.get(context);

            if (audioNodesOfContext.has(type)) {
                return Array.from(<Set<AudioNodeMock>> audioNodesOfContext.get(type));
            }
        }

        return [];
    }

    getScheduler (context: AudioContextMock): undefined | AudioEventScheduler {
        return this._schedulers.get(context);
    }

    reset (context: AudioContextMock) {
        if (this._audioNodes.has(context)) {
            this._audioNodes.delete(context);
        }

        if (this._schedulers.has(context)) {
            (<AudioEventScheduler> this._schedulers.get(context)).reset();

            this._schedulers.delete(context);
        }
    }

    setScheduler (context: AudioContextMock, scheduler: AudioEventScheduler) {
        this._schedulers.set(context, scheduler);
    }

}

export const registrar = new Registrar();

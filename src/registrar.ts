import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { DeLorean, IVehicle } from 'vehicles';

export class Registrar {

    private _audioNodes: WeakMap<AudioContextMock, Map<string, Set<AudioNodeMock>>>;

    private _deLoreans: WeakMap<AudioContextMock, DeLorean>;

    constructor () {
        this._audioNodes = new WeakMap();
        this._deLoreans = new WeakMap();
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

    getDeLorean (context: AudioContextMock): undefined | DeLorean {
        return this._deLoreans.get(context);
    }

    getVehicle (context: AudioContextMock): undefined | IVehicle {
        return this._deLoreans.get(context);
    }

    reset (context: AudioContextMock) {
        if (this._audioNodes.has(context)) {
            this._audioNodes.delete(context);
        }

        if (this._deLoreans.has(context)) {
            (<IVehicle> this._deLoreans.get(context)).reset();

            this._deLoreans.delete(context);
        }
    }

    setDeLorean (context: AudioContextMock, deLorean: DeLorean) {
        this._deLoreans.set(context, deLorean);
    }

}

export const registrar = new Registrar();

import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';

export class Registrar {

    private _nodes: WeakMap<AudioContextMock, Map<string, Set<AudioNodeMock>>>;

    constructor () {
        this._nodes = new WeakMap();
    }

    add (context: AudioContextMock, type: string, node: AudioNodeMock) {
        let nodesOfContext: Map<string, Set<AudioNodeMock>>;
        let nodesOfType: Set<AudioNodeMock>;

        if (this._nodes.has(context)) {
            nodesOfContext = <Map<string, Set<AudioNodeMock>>> this._nodes.get(context);
        } else {
            nodesOfContext = new Map();
            this._nodes.set(context, nodesOfContext);
        }

        if (nodesOfContext.has(type)) {
            nodesOfType = <Set<AudioNodeMock>> nodesOfContext.get(type);
        } else {
            nodesOfType = new Set();
            nodesOfContext.set(type, nodesOfType);
        }

        nodesOfType.add(node);
    }

    get (context: AudioContextMock, type: string) {
        if (this._nodes.has(context)) {
            const nodesOfContext = <Map<string, Set<AudioNodeMock>>> this._nodes.get(context);

            if (nodesOfContext.has(type)) {
                return Array.from(<Set<AudioNodeMock>> nodesOfContext.get(type));
            }
        }

        return [];
    }

    reset (context: AudioContextMock) {
        if (this._nodes.has(context)) {
            this._nodes.delete(context);
        }
    }

}

export const registrar = new Registrar();

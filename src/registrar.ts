import { TContext } from 'standardized-audio-context';
import { DeLorean, IVehicle } from 'vehicles';
import { AudioNodeMock } from './audio-node-mock';

export class Registrar {

    private _audioNodes: WeakMap<TContext, Map<string, Set<AudioNodeMock<TContext>>>>;

    private _deLoreans: WeakMap<TContext, DeLorean>;

    constructor () {
        this._audioNodes = new WeakMap();
        this._deLoreans = new WeakMap();
    }

    public addAudioNode <T extends TContext> (context: T, type: string, node: AudioNodeMock<T>): void {
        let audioNodesOfContext: Map<string, Set<AudioNodeMock<T>>>;
        let audioNodesOfType: Set<AudioNodeMock<T>>;

        if (this._audioNodes.has(context)) {
            audioNodesOfContext = <Map<string, Set<AudioNodeMock<T>>>> this._audioNodes.get(context);
        } else {
            audioNodesOfContext = new Map();
            this._audioNodes.set(context, audioNodesOfContext);
        }

        if (audioNodesOfContext.has(type)) {
            audioNodesOfType = <Set<AudioNodeMock<T>>> audioNodesOfContext.get(type);
        } else {
            audioNodesOfType = new Set();
            audioNodesOfContext.set(type, audioNodesOfType);
        }

        audioNodesOfType.add(node);
    }

    public getAudioNodes <T extends TContext> (context: T, type: string): AudioNodeMock<T>[] {
        if (this._audioNodes.has(context)) {
            const audioNodesOfContext = <Map<string, Set<AudioNodeMock<T>>>> this._audioNodes.get(context);

            if (audioNodesOfContext.has(type)) {
                return Array.from(<Set<AudioNodeMock<T>>> audioNodesOfContext.get(type));
            }
        }

        return [];
    }

    public getDeLorean <T extends TContext> (context: T): undefined | DeLorean {
        return this._deLoreans.get(context);
    }

    public getVehicle <T extends TContext> (context: T): undefined | IVehicle {
        return this._deLoreans.get(context);
    }

    public reset <T extends TContext> (context: T): void {
        if (this._audioNodes.has(context)) {
            this._audioNodes.delete(context);
        }

        if (this._deLoreans.has(context)) {
            (<IVehicle> this._deLoreans.get(context)).reset();

            this._deLoreans.delete(context);
        }
    }

    public setDeLorean <T extends TContext> (context: T, deLorean: DeLorean): void {
        this._deLoreans.set(context, deLorean);
    }

}

export const registrar = new Registrar();

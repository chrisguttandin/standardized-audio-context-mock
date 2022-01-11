import { TContext } from 'standardized-audio-context';
import { DeLorean, IVehicle } from 'vehicles';
import { IAudioNodeMap } from './interfaces';
import { TAudioNodes } from './types';

export class Registrar {
    private _audioNodes: WeakMap<TContext, Map<keyof IAudioNodeMap<TContext>, Set<TAudioNodes<TContext>>>>;

    private _deLoreans: WeakMap<TContext, DeLorean>;

    constructor() {
        this._audioNodes = new WeakMap();
        this._deLoreans = new WeakMap();
    }

    public addAudioNode<T extends TContext, U extends keyof IAudioNodeMap<T>>(context: T, type: U, node: IAudioNodeMap<T>[U]): void {
        let audioNodesOfContext = this._audioNodes.get(context);

        if (audioNodesOfContext === undefined) {
            audioNodesOfContext = new Map();

            this._audioNodes.set(context, audioNodesOfContext);
        }

        let audioNodesOfType = audioNodesOfContext.get(type);

        if (audioNodesOfType === undefined) {
            audioNodesOfType = new Set();

            audioNodesOfContext.set(type, audioNodesOfType);
        }

        audioNodesOfType.add(node);
    }

    public getAudioNodes<T extends TContext, U extends keyof IAudioNodeMap<T>>(context: T, type: U): IAudioNodeMap<T>[U][] {
        const audioNodesOfContext = this._audioNodes.get(context);

        if (audioNodesOfContext !== undefined && audioNodesOfContext.has(type)) {
            return Array.from(<Set<IAudioNodeMap<T>[U]>>audioNodesOfContext.get(type));
        }

        return [];
    }

    public getDeLorean<T extends TContext>(context: T): undefined | DeLorean {
        return this._deLoreans.get(context);
    }

    public getVehicle<T extends TContext>(context: T): undefined | IVehicle {
        return this._deLoreans.get(context);
    }

    public reset<T extends TContext>(context: T): void {
        if (this._audioNodes.has(context)) {
            this._audioNodes.delete(context);
        }

        if (this._deLoreans.has(context)) {
            (<IVehicle>this._deLoreans.get(context)).reset();

            this._deLoreans.delete(context);
        }
    }

    public setDeLorean<T extends TContext>(context: T, deLorean: DeLorean): void {
        this._deLoreans.set(context, deLorean);
    }
}

export const registrar = new Registrar();

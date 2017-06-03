import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';

export class DynamicsCompressorNodeMock extends AudioNodeMock {

    private _attack: AudioParamMock;

    private _knee: AudioParamMock;

    private _ratio: AudioParamMock;

    private _reduction: number;

    private _release: AudioParamMock;

    private _threshold: AudioParamMock;

    constructor (options: { scheduler: AudioEventScheduler }) {
        super({
            channelCount: 2,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._attack = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 0.003
        });
        this._knee = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 30
        });
        this._ratio = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 12
        });
        this._reduction = 0;
        this._release = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 0.25
        });
        this._threshold = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: -24
        });
    }

    get attack () {
        return this._attack;
    }

    set attack (value) {
        value;
    }

    get knee () {
        return this._knee;
    }

    set knee (value) {
        value;
    }

    get ratio () {
        return this._ratio;
    }

    set ratio (value) {
        value;
    }

    get reduction () {
        return this._reduction;
    }

    set reduction (value) {
        value;
    }

    get release () {
        return this._release;
    }

    set release (value) {
        value;
    }

    get threshold () {
        return this._threshold;
    }

    set threshold (value) {
        value;
    }

}

import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';

export class DynamicsCompressorNodeMock extends AudioNodeMock {

    constructor (options) {
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

    set attack (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get knee () {
        return this._knee;
    }

    set knee (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get ratio () {
        return this._ratio;
    }

    set ratio (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get reduction () {
        return this._reduction;
    }

    set reduction (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get release () {
        return this._release;
    }

    set release (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get threshold () {
        return this._threshold;
    }

    set threshold (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

}

import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';

export class GainNodeMock extends AudioNodeMock {

    constructor (options) {
        super({
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._gain = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
    }

    get gain () {
        return this._gain;
    }

    set gain (value) {} // eslint-disable-line no-unused-vars

}

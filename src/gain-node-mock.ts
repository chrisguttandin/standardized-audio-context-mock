import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { AudioEventScheduler } from './helper/audio-event-scheduler';

export class GainNodeMock extends AudioNodeMock {

    private _gain: AudioParamMock;

    constructor (options: { scheduler: AudioEventScheduler }) {
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

    set gain (value: AudioParamMock) {
        value;
    }

}

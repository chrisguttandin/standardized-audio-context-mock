import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { spy } from 'sinon';

export class OscillatorNodeMock extends AudioNodeMock {

    constructor (options) {
        super({
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this.frequency = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.detune = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.type = 'aoeu';
        this.start = spy();
        this.stop = spy();
        this.setPeriodicWave = spy();
    }

}

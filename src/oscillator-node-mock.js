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

        this._detune = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 0
        });
        this._frequency = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 440
        });
        this.setPeriodicWave = spy();
        this.start = spy();
        this.stop = spy();
        this.type = 'sine';
    }

    get detune () {
        return this._detune;
    }

    set detune (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    get frequency () {
        return this._frequency;
    }

    set frequency (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

}

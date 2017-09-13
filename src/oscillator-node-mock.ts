import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { SinonSpy, spy } from 'sinon';
import { registrar } from './registrar';
import { AudioContextMock } from './audio-context-mock';

export class OscillatorNodeMock extends AudioNodeMock {

    public setPeriodicWave: SinonSpy;

    public start: SinonSpy;

    public stop: SinonSpy;

    public type: string;

    private _detune: AudioParamMock;

    private _frequency: AudioParamMock;

    constructor (context: AudioContextMock) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this._detune = new AudioParamMock({
            deLorean,
            onEventListUpdatedHandler: () => {},
            value: 0
        });
        this._frequency = new AudioParamMock({
            deLorean,
            onEventListUpdatedHandler: () => {},
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

    set detune (value: AudioParamMock) {
        value;
    }

    get frequency () {
        return this._frequency;
    }

    set frequency (value: AudioParamMock) {
        value;
    }

}

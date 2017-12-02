import { SinonSpy, spy } from 'sinon';
import { IOscillatorNode, TEndedEventHandler, TOscillatorType } from 'standardized-audio-context';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class OscillatorNodeMock extends AudioNodeMock implements IOscillatorNode {

    public setPeriodicWave: SinonSpy;

    public start: SinonSpy;

    public stop: SinonSpy;

    public type: TOscillatorType;

    private _detune: AudioParamMock;

    private _frequency: AudioParamMock;

    private _onended: null | TEndedEventHandler;

    constructor (context: AudioContextMock) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this._detune = new AudioParamMock({
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38,
            onEventListUpdatedHandler () { }, // tslint:disable-line:no-empty
            value: 0
        });
        this._frequency = new AudioParamMock({
            deLorean,
            maxValue: context.sampleRate / 2,
            minValue: -(context.sampleRate / 2),
            onEventListUpdatedHandler () { }, // tslint:disable-line:no-empty
            value: 440
        });
        // @todo Implement the ended event.
        this._onended = null;
        this.setPeriodicWave = spy();
        this.start = spy();
        this.stop = spy();
        this.type = 'sine';
    }

    get detune () {
        return this._detune;
    }

    set detune (value: AudioParamMock) {
        value; // tslint:disable-line:no-unused-expression
    }

    get frequency () {
        return this._frequency;
    }

    set frequency (value: AudioParamMock) {
        value; // tslint:disable-line:no-unused-expression
    }

    get onended () {
        return this._onended;
    }

    set onended (value: null | TEndedEventHandler) {
        if (typeof value === 'function' || value === null) {
            this._onended = value;
        }
    }

}

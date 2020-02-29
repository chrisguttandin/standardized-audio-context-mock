import { AutomationEventList } from 'automation-events';
import { SinonSpy, spy } from 'sinon';
import { IOscillatorNode, TContext, TEventHandler, TOscillatorType } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class OscillatorNodeMock<T extends TContext> extends AudioNodeMock<T> implements IOscillatorNode<T> {

    public setPeriodicWave: SinonSpy;

    public start: SinonSpy;

    public stop: SinonSpy;

    public type: TOscillatorType;

    private _detune: AudioParamMock;

    private _frequency: AudioParamMock;

    private _onended: null | TEventHandler<this>;

    constructor (context: T) {
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
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._frequency = new AudioParamMock({
            automationEventList: new AutomationEventList(440),
            deLorean,
            maxValue: context.sampleRate / 2,
            minValue: -(context.sampleRate / 2)
        });
        // @todo Implement the ended event.
        this._onended = null;
        this.setPeriodicWave = spy();
        this.start = spy();
        this.stop = spy();
        this.type = 'sine';
    }

    get detune (): AudioParamMock {
        return this._detune;
    }

    set detune (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get frequency (): AudioParamMock {
        return this._frequency;
    }

    set frequency (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get onended (): null | TEventHandler<this> {
        return this._onended;
    }

    set onended (value) {
        if (typeof value === 'function' || value === null) {
            this._onended = value;
        }
    }

}

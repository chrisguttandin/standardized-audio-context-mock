import { AutomationEventList } from 'automation-events';
import { IBiquadFilterNode, TBiquadFilterType, TContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class BiquadFilterNodeMock<T extends TContext> extends AudioNodeMock<T> implements IBiquadFilterNode<T> {
    private _detune: AudioParamMock;

    private _frequency: AudioParamMock;

    private _gain: AudioParamMock;

    private _Q: AudioParamMock;

    private _type: TBiquadFilterType;

    constructor(context: T) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._detune = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 1200 * Math.log2(3.4028234663852886e38),
            minValue: -1200 * Math.log2(3.4028234663852886e38)
        });
        this._frequency = new AudioParamMock({
            automationEventList: new AutomationEventList(350),
            deLorean,
            maxValue: context.sampleRate / 2,
            minValue: 0
        });
        this._gain = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 40 * Math.log10(3.4028234663852886e38),
            minValue: -3.4028234663852886e38
        });
        this._Q = new AudioParamMock({
            automationEventList: new AutomationEventList(1),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._type = 'lowpass';

        registrar.addAudioNode(context, 'BiquadFilterNode', this);
    }

    get detune(): AudioParamMock {
        return this._detune;
    }

    set detune(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get frequency(): AudioParamMock {
        return this._frequency;
    }

    set frequency(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get gain(): AudioParamMock {
        return this._gain;
    }

    set gain(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get Q(): AudioParamMock {
        return this._Q;
    }

    set Q(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get type(): TBiquadFilterType {
        return this._type;
    }

    set type(value) {
        if (['allpass', 'bandpass', 'highpass', 'highshelf', 'lowpass', 'lowshelf', 'notch', 'peaking'].includes(value)) {
            this._type = value;
        }
    }

    public getFrequencyResponse(): void {
        // @todo
    }
}

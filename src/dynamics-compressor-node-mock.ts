import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class DynamicsCompressorNodeMock extends AudioNodeMock {

    private _attack: AudioParamMock;

    private _knee: AudioParamMock;

    private _ratio: AudioParamMock;

    private _reduction: number;

    private _release: AudioParamMock;

    private _threshold: AudioParamMock;

    constructor (context: AudioContextMock) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCount: 2,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._attack = new AudioParamMock({
            deLorean,
            maxValue: 1,
            minValue: 0,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: 0.003
        });
        this._knee = new AudioParamMock({
            deLorean,
            maxValue: 40,
            minValue: 0,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: 30
        });
        this._ratio = new AudioParamMock({
            deLorean,
            maxValue: 20,
            minValue: 1,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: 12
        });
        this._reduction = 0;
        this._release = new AudioParamMock({
            deLorean,
            maxValue: 1,
            minValue: 0,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: 0.25
        });
        this._threshold = new AudioParamMock({
            deLorean,
            maxValue: -100,
            minValue: 0,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: -24
        });
    }

    get attack (): AudioParamMock {
        return this._attack;
    }

    set attack (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get knee (): AudioParamMock {
        return this._knee;
    }

    set knee (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get ratio (): AudioParamMock {
        return this._ratio;
    }

    set ratio (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get reduction (): number {
        return this._reduction;
    }

    set reduction (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get release (): AudioParamMock {
        return this._release;
    }

    set release (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get threshold (): AudioParamMock {
        return this._threshold;
    }

    set threshold (value) {
        value; // tslint:disable-line:no-unused-expression
    }

}

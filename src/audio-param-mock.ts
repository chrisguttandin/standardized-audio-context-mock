import {
    AutomationEventList,
    createCancelAndHoldAutomationEvent,
    createLinearRampToValueAutomationEvent,
    createSetValueAutomationEvent
} from 'automation-events';
import { SinonSpy, spy, stub } from 'sinon';
import { IAudioParam } from 'standardized-audio-context';
import { DeLorean } from 'vehicles';

export class AudioParamMock implements IAudioParam {

    public cancelScheduledValues: SinonSpy;

    public exponentialRampToValueAtTime: SinonSpy;

    public setTargetAtTime: SinonSpy;

    public setValueCurveAtTime: SinonSpy;

    private _automationEventList: AutomationEventList;

    private _defaultValue: number;

    private _deLorean: undefined | DeLorean;

    private _maxValue: number;

    private _minValue: number;

    constructor (options: { automationEventList: AutomationEventList; deLorean?: DeLorean; maxValue: number; minValue: number }) {
        this._automationEventList = options.automationEventList;
        this.cancelScheduledValues = spy();
        this._deLorean = options.deLorean;
        this._defaultValue = options.automationEventList.getValue(0);
        this.exponentialRampToValueAtTime = spy();
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;
        this.setTargetAtTime = spy();
        this.setValueCurveAtTime = spy();

        stub(this, 'cancelAndHoldAtTime')
            .callThrough();
        stub(this, 'linearRampToValueAtTime')
            .callThrough();
        stub(this, 'setValueAtTime')
            .callThrough();
    }

    get defaultValue (): number {
        return this._defaultValue;
    }

    set defaultValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get maxValue (): number {
        return this._maxValue;
    }

    set maxValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get minValue (): number {
        return this._minValue;
    }

    set minValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get value (): number {
        if (this._deLorean === undefined) {
            return this._defaultValue;
        }

        return this._automationEventList.getValue(this._deLorean.position);
    }

    set value (value) {
        this._automationEventList.add(createSetValueAutomationEvent(value, (this._deLorean === undefined) ? 0 : this._deLorean.position));
    }

    public cancelAndHoldAtTime (cancelTime: number): IAudioParam {
        this._automationEventList.add(createCancelAndHoldAutomationEvent(cancelTime));

        return this;
    }

    public linearRampToValueAtTime (value: number, endTime: number): IAudioParam {
        this._automationEventList.add(createLinearRampToValueAutomationEvent(value, endTime));

        return this;
    }

    public setValueAtTime (value: number, startTime: number): IAudioParam {
        this._automationEventList.add(createSetValueAutomationEvent(value, startTime));

        return this;
    }

}

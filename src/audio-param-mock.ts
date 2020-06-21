import {
    AutomationEventList,
    createCancelAndHoldAutomationEvent,
    createCancelScheduledValuesAutomationEvent,
    createExponentialRampToValueAutomationEvent,
    createLinearRampToValueAutomationEvent,
    createSetTargetAutomationEvent,
    createSetValueAutomationEvent,
    createSetValueCurveAutomationEvent
} from 'automation-events';
import { stub } from 'sinon';
import { IAudioParam } from 'standardized-audio-context';
import { DeLorean } from 'vehicles';

export class AudioParamMock implements IAudioParam {
    private _automationEventList: AutomationEventList;

    private _defaultValue: number;

    private _deLorean: undefined | DeLorean;

    private _maxValue: number;

    private _minValue: number;

    constructor(options: { automationEventList: AutomationEventList; deLorean?: DeLorean; maxValue: number; minValue: number }) {
        this._automationEventList = options.automationEventList;
        this._deLorean = options.deLorean;
        this._defaultValue = options.automationEventList.getValue(0);
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;

        stub(this, 'cancelAndHoldAtTime').callThrough();
        stub(this, 'cancelScheduledValues').callThrough();
        stub(this, 'exponentialRampToValueAtTime').callThrough();
        stub(this, 'linearRampToValueAtTime').callThrough();
        stub(this, 'setTargetAtTime').callThrough();
        stub(this, 'setValueAtTime').callThrough();
        stub(this, 'setValueCurveAtTime').callThrough();
    }

    get defaultValue(): number {
        return this._defaultValue;
    }

    set defaultValue(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get maxValue(): number {
        return this._maxValue;
    }

    set maxValue(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get minValue(): number {
        return this._minValue;
    }

    set minValue(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get value(): number {
        if (this._deLorean === undefined) {
            return this._defaultValue;
        }

        return this._automationEventList.getValue(this._deLorean.position);
    }

    set value(value) {
        this._automationEventList.add(createSetValueAutomationEvent(value, this._deLorean === undefined ? 0 : this._deLorean.position));
    }

    public cancelAndHoldAtTime(cancelTime: number): IAudioParam {
        this._automationEventList.add(createCancelAndHoldAutomationEvent(cancelTime));

        return this;
    }

    public cancelScheduledValues(cancelTime: number): IAudioParam {
        this._automationEventList.add(createCancelScheduledValuesAutomationEvent(cancelTime));

        return this;
    }

    public exponentialRampToValueAtTime(value: number, endTime: number): IAudioParam {
        this._automationEventList.add(createExponentialRampToValueAutomationEvent(value, endTime));

        return this;
    }

    public linearRampToValueAtTime(value: number, endTime: number): IAudioParam {
        this._automationEventList.add(createLinearRampToValueAutomationEvent(value, endTime));

        return this;
    }

    public setTargetAtTime(target: number, startTime: number, timeConstant: number): IAudioParam {
        this._automationEventList.add(createSetTargetAutomationEvent(target, startTime, timeConstant));

        return this;
    }

    public setValueAtTime(value: number, startTime: number): IAudioParam {
        this._automationEventList.add(createSetValueAutomationEvent(value, startTime));

        return this;
    }

    public setValueCurveAtTime(values: Float32Array, startTime: number, duration: number): IAudioParam {
        this._automationEventList.add(createSetValueCurveAutomationEvent(values, startTime, duration));

        return this;
    }
}

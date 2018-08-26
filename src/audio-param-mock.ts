import { SinonSpy, spy, stub } from 'sinon';
import { IAudioParam } from 'standardized-audio-context';
import { DeLorean } from 'vehicles';
import { AudioParamEvent } from './helper/audio-param-event';
import { AudioParamEventList } from './helper/audio-param-event-list';
import { AudioParamEventType } from './helper/audio-param-event-type';

export class AudioParamMock implements IAudioParam {

    public cancelScheduledValues: SinonSpy;

    public exponentialRampToValueAtTime: SinonSpy;

    public setTargetAtTime: SinonSpy;

    public setValueCurveAtTime: SinonSpy;

    private _defaultValue: number;

    private _deLorean: undefined | DeLorean;

    // @todo Fix access modifier.
    private _eventList: AudioParamEventList;

    private _maxValue: number;

    private _minValue: number;

    private _onEventListUpdatedHandler: Function;

    private _value: number;

    constructor (options: { deLorean?: DeLorean, maxValue: number, minValue: number, onEventListUpdatedHandler: Function, value: number }) {
        this.cancelScheduledValues = spy();
        this._deLorean = options.deLorean;
        this._defaultValue = options.value;
        this._eventList = new AudioParamEventList();
        this.exponentialRampToValueAtTime = spy();
        this._maxValue = options.maxValue;
        this._minValue = options.minValue;
        this._onEventListUpdatedHandler = options.onEventListUpdatedHandler;
        this.setTargetAtTime = spy();
        this.setValueCurveAtTime = spy();
        this._value = options.value;

        this._eventList.onUpdated = () => options.onEventListUpdatedHandler();

        stub(this, 'linearRampToValueAtTime')
            .callThrough();
        stub(this, 'setValueAtTime')
            .callThrough();
    }

    get defaultValue () {
        return this._defaultValue;
    }

    set defaultValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get maxValue () {
        return this._maxValue;
    }

    set maxValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get minValue () {
        return this._minValue;
    }

    set minValue (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get value () {
        return this._computeValue();
    }

    set value (value) {
        this._value = value;
        this._onEventListUpdatedHandler();
    }

    public cancelAndHoldAtTime (cancelTime: number) {
        // @todo Implemnt cancelAndHoldTime().
        cancelTime; // tslint:disable-line:no-unused-expression
    }

    public linearRampToValueAtTime (value: number, endTime: number): IAudioParam {
        this._eventList.add(new AudioParamEvent({
            endTime,
            type: AudioParamEventType.LINEAR_RAMP_TO_VALUE,
            value
        }));

        return this;
    }

    public setValueAtTime (value: number, startTime: number): IAudioParam {
        this._eventList.add(new AudioParamEvent({
            startTime,
            type: AudioParamEventType.SET_VALUE,
            value
        }));

        return this;
    }

    private _computeValue () {
        let computedValue = null;

        if (this._deLorean === undefined) {
            return this._defaultValue;
        }

        this._eventList.some((event: AudioParamEvent) => {
            if (this._deLorean === undefined) {
                return false;
            }

            if ((event.startTime !== undefined && this._deLorean.position >= event.startTime) &&
                    (event.endTime !== undefined && this._deLorean.position <= event.endTime)) {
                if (event.previous !== undefined && event.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
                    computedValue = event.previous.value + ((event.value - event.previous.value) * (1 - ((event.endTime - this._deLorean.position) / (event.endTime - event.startTime)))); // tslint:disable-line:max-line-length
                } else if (event.type === AudioParamEventType.SET_VALUE) {
                    computedValue = event.value;
                }

                return true;
            }

            return false;
        });

        if (computedValue === null && this._eventList.length > 0)  {
            const lastEvent = this._eventList.last();

            if (lastEvent.endTime !== undefined && this._deLorean.position >= lastEvent.endTime) {
                computedValue = lastEvent.value;
            }
        }

        return (computedValue === null) ? this._value : computedValue;
    }

}

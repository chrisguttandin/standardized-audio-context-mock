import { SinonSpy, spy, stub } from 'sinon';
import { AudioParamEvent } from './helper/audio-param-event';
import { AudioParamEventList } from './helper/audio-param-event-list';
import { AudioParamEventType } from './helper/audio-param-event-type';
import { DeLorean } from 'vehicles';

export class AudioParamMock {

    public cancelScheduledValues: SinonSpy;

    // @todo Fix access modifier.
    public _eventList: AudioParamEventList;

    public exponentialRampToValueAtTime: SinonSpy;

    public setTargetAtTime: SinonSpy;

    public setValueCurveAtTime: SinonSpy;

    private _deLorean: undefined | DeLorean;

    private _defaultValue: number;

    private _onEventListUpdatedHandler: Function;

    private _value: number;

    constructor (options: { deLorean?: DeLorean, onEventListUpdatedHandler: Function, value: number }) {
        this.cancelScheduledValues = spy();
        this._deLorean = options.deLorean;
        this._defaultValue = options.value;
        this._eventList = new AudioParamEventList();
        this.exponentialRampToValueAtTime = spy();
        this._onEventListUpdatedHandler = options.onEventListUpdatedHandler;
        this.setTargetAtTime = spy();
        this.setValueCurveAtTime = spy();
        this._value = options.value;

        this._eventList.onUpdated = () => options.onEventListUpdatedHandler();

        stub(this, 'linearRampToValueAtTime').callThrough();
        stub(this, 'setValueAtTime').callThrough();
    }

    get defaultValue () {
        return this._defaultValue;
    }

    set defaultValue (value) {
        value;
    }

    get value () {
        return this._computeValue();
    }

    set value (value) {
        this._value = value;
        this._onEventListUpdatedHandler();
    }

    _computeValue () {
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
                    computedValue = event.previous.value + ((event.value - event.previous.value) * (1 - ((event.endTime - this._deLorean.position) / (event.endTime - event.startTime))));
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

    linearRampToValueAtTime (value: number, endTime: number) {
        this._eventList.add(new AudioParamEvent({
            endTime,
            type: AudioParamEventType.LINEAR_RAMP_TO_VALUE,
            value
        }));
    }

    setValueAtTime (value: number, startTime: number) {
        this._eventList.add(new AudioParamEvent({
            startTime,
            type: AudioParamEventType.SET_VALUE,
            value
        }));
    }

}

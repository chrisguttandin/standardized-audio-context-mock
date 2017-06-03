import { SinonSpy, spy, stub } from 'sinon';
import { AudioParamEvent } from './helper/audio-param-event';
import { AudioParamEventList } from './helper/audio-param-event-list';
import { AudioParamEventType } from './helper/audio-param-event-type';
import { AudioEventScheduler } from './helper/audio-event-scheduler';

export class AudioParamMock {

    public cancelScheduledValues: SinonSpy;

    // @todo Fix access modifier.
    public _eventList: AudioParamEventList;

    public exponentialRampToValueAtTime: SinonSpy;

    public setTargetAtTime: SinonSpy;

    public setValueCurveAtTime: SinonSpy;

    private _defaultValue: number;

    private _onEventListUpdatedHandler: Function;

    private _scheduler: AudioEventScheduler;

    private _value: number;

    constructor (options: { onEventListUpdatedHandler: Function, scheduler: AudioEventScheduler, value: number }) {
        this.cancelScheduledValues = spy();
        this._defaultValue = options.value;
        this._eventList = new AudioParamEventList();
        this.exponentialRampToValueAtTime = spy();
        this._onEventListUpdatedHandler = options.onEventListUpdatedHandler;
        this._scheduler = options.scheduler;
        this.setTargetAtTime = spy();
        this.setValueCurveAtTime = spy();
        this._value = options.value;

        this._eventList.on('updated', () => options.onEventListUpdatedHandler());

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

        this._eventList.some((event: AudioParamEvent) => {
            if ((event.startTime !== undefined && this._scheduler.currentTime >= event.startTime) &&
                    (event.endTime !== undefined && this._scheduler.currentTime <= event.endTime)) {
                if (event.previous !== undefined && event.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
                    computedValue = event.previous.value + ((event.value - event.previous.value) * (1 - ((event.endTime - this._scheduler.currentTime) / (event.endTime - event.startTime))));
                } else if (event.type === AudioParamEventType.SET_VALUE) {
                    computedValue = event.value;
                }

                return true;
            }

            return false;
        });

        if (computedValue === null && this._eventList.length > 0)  {
            const lastEvent = this._eventList.last();

            if (lastEvent.endTime !== undefined && this._scheduler.currentTime >= lastEvent.endTime) {
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

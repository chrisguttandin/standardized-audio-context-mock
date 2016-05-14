import { spy, stub } from 'sinon';
import { AudioParamEvent } from './helper/audio-param-event';
import { AudioParamEventList } from './helper/audio-param-event-list';
import { AudioParamEventType } from './helper/audio-param-event-type';

export class AudioParamMock {

    constructor (options) {
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

        stub(this, 'linearRampToValueAtTime', this.linearRampToValueAtTime);
        stub(this, 'setValueAtTime', this.setValueAtTime);
    }

    get defaultValue () {
        return this._defaultValue;
    }

    set defaultValue (value) {} // eslint-disable-line no-unused-vars

    get value () {
        return this._computeValue();
    }

    set value (value) {
        this._value = value;
        this._onEventListUpdatedHandler();
    }

    _computeValue () {
        var computedValue = null;

        this._eventList.some((event) => {
            if (this._scheduler.currentTime >= event.startTime && this._scheduler.currentTime <= event.endTime) {
                if (event.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
                    computedValue = event.previous.value + (event.value - event.previous.value) * (1 - ((event.endTime - this._scheduler.currentTime) / (event.endTime - event.startTime)));
                } else if (event.type === AudioParamEventType.SET_VALUE) {
                    computedValue = event.value;
                }

                return true;
            }

            return false;
        });

        if (computedValue === null && this._eventList.length > 0)  {
            let lastEvent = this._eventList.last();

            if (this._scheduler.currentTime >= lastEvent.endTime) {
                computedValue = lastEvent.value;
            }
        }

        return (computedValue === null) ? this._value : computedValue;
    }

    linearRampToValueAtTime (value, endTime) {
        this._eventList.add(new AudioParamEvent({
            endTime,
            type: AudioParamEventType.LINEAR_RAMP_TO_VALUE,
            value
        }));
    }

    setValueAtTime (value, startTime) {
        this._eventList.add(new AudioParamEvent({
            startTime,
            type: AudioParamEventType.SET_VALUE,
            value
        }));
    }

}

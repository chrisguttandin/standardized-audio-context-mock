import { AudioParamEventType } from './audio-param-event-type';

export class AudioParamEvent {

    public endTime: number | undefined;

    public startTime: number | undefined;

    public type: string;

    public value: number;

    private _previous: undefined | AudioParamEvent;

    constructor (options: { endTime?: number, previous?: AudioParamEvent, startTime?: number, type: string, value: number }) {
        this._previous = options.previous;
        this.type = options.type;
        this.value = options.value;

        if (options.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
            this.startTime = (options.previous) ? options.previous.endTime : options.endTime;
            this.endTime = options.endTime;
        } else if (options.type === AudioParamEventType.SET_VALUE) {
            this.startTime = options.startTime;
            this.endTime = options.startTime;
        }
    }

    get previous (): undefined | AudioParamEvent {
        return this._previous;
    }

    set previous (value) {
        this._previous = value;

        if (value && this.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
            this.startTime = value.endTime;
        }
    }

}

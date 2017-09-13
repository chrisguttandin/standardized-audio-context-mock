import { AudioParamEvent } from './audio-param-event';

export class AudioParamEventList {

    public onUpdated: null | Function;

    private _events: AudioParamEvent[] = [];

    constructor () {
        this._events = [];
        this.onUpdated = null;
    }

    get length () {
        return this._events.length;
    }

    public add (event: AudioParamEvent) {
        let index = this._events.length;

        this._events.some((value, i) => {
            if (value.endTime !== undefined && event.endTime !== undefined && value.endTime > event.endTime) {
                index = i;

                return true;
            }

            return false;
        });

        this._events.splice(index, 0, event);

        if (index > 0) {
            event.previous = this._events[index - 1];
        }
        if (index < this._events.length - 1) {
            this._events[this._events.length - 1].previous = event;
        }

        if (this.onUpdated !== null) {
            this.onUpdated();
        }
    }

    public forEach (callback: (event: AudioParamEvent) => void) {
        return this._events.forEach.call(this._events, callback);
    }

    public last () {
        return this._events[this._events.length - 1];
    }

    public some (callback: (event: AudioParamEvent) => boolean) {
        return this._events.some.call(this._events, callback);
    }

}

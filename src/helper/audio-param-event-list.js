import { EventEmitter } from 'events';

export class AudioParamEventList extends EventEmitter {

    constructor () {
        super();

        this._events = [];
    }

    get length () {
        return this._events.length;
    }

    add (event) {
        var index = this._events.length;

        this._events.some((value, i) => {
            if (value.endTime > event.endTime) {
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

        this.emit('updated');
    }

    forEach () {
        return this._events.forEach.apply(this._events, arguments);
    }

    last () {
        return this._events[this._events.length - 1];
    }

    some () {
        return this._events.some.apply(this._events, arguments);
    }

}

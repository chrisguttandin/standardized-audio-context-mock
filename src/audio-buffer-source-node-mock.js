import { AudioBufferMock } from './audio-buffer-mock.js';
import { AudioNodeMock } from './audio-node-mock.js';
import { AudioParamEventType } from './helper/audio-param-event-type.js';
import { AudioParamMock } from './audio-param-mock.js';
import { stub } from 'sinon';

export class AudioBufferSourceNodeMock extends AudioNodeMock {

    constructor (options) {
        super({
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this._buffer = null;
        this.loop = false;
        this.loopEnd = 0;
        this.loopStart = 0;
        this._onended = null;
        this._onEndedDefinition = null;
        this._started = null;
        this._stopped = null;
        this._scheduler = options.scheduler;
        this._playbackRate = new AudioParamMock({
            onEventListUpdatedHandler: this._scheduleOnEndedHandler.bind(this),
            scheduler: options.scheduler,
            value: 1
        });
        this._playbackRateValue = 1;

        stub(this, 'start', this.start);
        stub(this, 'stop', this.stop);
    }

    get buffer () {
        return this._buffer;
    }

    set buffer (value) {
        if (!(value instanceof AudioBufferMock)) {
            throw new TypeError('Failed to set the \'buffer\' property on \'AudioBufferSourceNode\': The provided value is not of type \'AudioBufferMock\'.');
        }

        this._buffer = value;
    }

    // get detune () {}

    get onended () {
        return this._onended;
    }

    set onended (value) {
        if (typeof value === 'function' || value === null) {
            this._onended = value;
        }
    }

    get playbackRate () {
        return this._playbackRate;
    }

    set playbackRate (value) {} // eslint-disable-line class-methods-use-this, no-unused-vars

    _callOnEndedHandler () {
        if (typeof this.onended === 'function') {
            this.onended();
        }
    }

    _scheduleOnEndedHandler () {
        var actualDuration,
            effectiveDuration,
            playbackRateOffset,
            when;

        if (this._onEndedDefinition !== null) {
            this._scheduler.cancel(this._onEndedDefinition);
            this._onEndedDefinition = null;
        }

        if (this._started !== null) {

            if (this._playbackRate._eventList.length === 0) {
                if (this._started.when > this._scheduler.currentTime) {
                    playbackRateOffset = 0;
                    when = (this._started.when - this._scheduler.currentTime);
                } else {
                    playbackRateOffset = (this._scheduler.currentTime - this._started.when) / this._playbackRateValue;
                    when = 0;
                }

                when += this._scheduler.currentTime + ((this._started.duration - playbackRateOffset) / this._playbackRate.value);
                this._playbackRateValue = this._playbackRate.value;
            } else {
                actualDuration = 0;
                effectiveDuration = 0;

                this._playbackRate._eventList.forEach((event) => {
                    if (event.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
                        effectiveDuration += (event.endTime - event.startTime) * ((event.value + event.previous.value) / 2);
                        actualDuration += (event.endTime - event.startTime);
                    } else if (event.type === AudioParamEventType.SET_VALUE) {
                        if (event.previous) {
                            // @todo
                        } else {
                            effectiveDuration = (event.startTime - this._started.when) / this._playbackRate.value;
                            actualDuration = (event.startTime - this._started.when);
                        }
                    }


                    if (effectiveDuration >= /*this.buffer.duration*/ 8) {
                        // @todo schedule ended handler now
                    }

                }, this);

                if (actualDuration < this._started.duration) {
                    actualDuration = this._started.duration;
                    effectiveDuration += (this._started.duration - effectiveDuration) / this._playbackRate._eventList.last().value;
                }

                when = this._started.when + effectiveDuration;
            }

            if (this._stopped !== null && this._stopped.when < when) {
                when = this._stopped.when;
            }

            this._onEndedDefinition = {
                func: this._callOnEndedHandler.bind(this),
                when
            };

            this._scheduler.schedule(this._onEndedDefinition);
        }
    }

    start (when, offset, duration) {
        if (arguments.length === 0) {
            when = 0;
        }

        if (when < this._scheduler.currentTime) {
            when = this._scheduler.currentTime;
        }

        if (arguments.length < 2) {
            offset = 0;
        }

        if (arguments.length < 3) {
            duration = this.buffer.duration - offset;
        }

        this._started = {
            duration,
            when
        };

        this._scheduleOnEndedHandler();
    }

    stop (when) {
        if (arguments.length === 0) {
            when = 0;
        }

        if (when < this._scheduler.currentTime) {
            when = this._scheduler.currentTime;
        }

        this._stopped = {
            when
        };

        this._scheduleOnEndedHandler();
    }

}

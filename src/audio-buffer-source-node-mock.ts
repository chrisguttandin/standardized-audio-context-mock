import { AudioBufferMock } from './audio-buffer-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { DeLorean } from 'vehicles';
import { AudioParamEventType } from './helper/audio-param-event-type';
import { registrar } from './registrar';
import { stub } from 'sinon';

export class AudioBufferSourceNodeMock extends AudioNodeMock {

    public loop: boolean;

    public loopEnd: number;

    public loopStart: number;

    private _buffer: null | AudioBufferMock;

    private _deLorean: undefined | DeLorean;

    private _onended: null | Function;

    private _onEndedTicket: null | number;

    private _playbackRate: AudioParamMock;

    private _playbackRateValue: number;

    private _started: null | { duration: number, maxEffectiveDuration: number, when: number };

    private _stopped: null | { when: number };

    constructor (context: AudioContextMock) {
        super({
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this._buffer = null;
        this._deLorean = <DeLorean> registrar.getVehicle(context);
        this.loop = false;
        this.loopEnd = 0;
        this.loopStart = 0;
        this._onended = null;
        this._onEndedTicket = null;
        this._started = null;
        this._stopped = null;
        this._playbackRate = new AudioParamMock({
            deLorean: this._deLorean,
            onEventListUpdatedHandler: this._scheduleOnEndedHandler.bind(this),
            value: 1
        });
        this._playbackRateValue = 1;

        stub(this, 'start').callThrough();
        stub(this, 'stop').callThrough();
    }

    get buffer () {
        return this._buffer;
    }

    set buffer (value: null | AudioBufferMock) {
        if (!(value instanceof AudioBufferMock)) {
            throw new TypeError('Failed to set the \'buffer\' property on \'AudioBufferSourceNode\': The provided value is not of type \'AudioBufferMock\'.');
        }

        this._buffer = value;
    }

    // get detune () {}

    get onended () {
        return this._onended;
    }

    set onended (value: null | Function) {
        if (typeof value === 'function' || value === null) {
            this._onended = value;
        }
    }

    get playbackRate () {
        return this._playbackRate;
    }

    set playbackRate (value) {
        value;
    }

    _callOnEndedHandler () {
        if (typeof this.onended === 'function') {
            this.onended();
        }
    }

    _scheduleOnEndedHandler () {
        if (this._deLorean === undefined) {
            return;
        }

        if (this._onEndedTicket !== null) {
            this._deLorean.cancel(this._onEndedTicket);
            this._onEndedTicket = null;
        }

        if (this._started !== null) {
            let when;

            if (this._playbackRate._eventList.length === 0) {
                let playbackRateOffset;

                if (this._started.when > this._deLorean.position) {
                    playbackRateOffset = 0;
                    when = (this._started.when - this._deLorean.position);
                } else {
                    playbackRateOffset = (this._deLorean.position - this._started.when) / this._playbackRateValue;
                    when = 0;
                }

                when += this._deLorean.position + ((this._started.duration - playbackRateOffset) / this._playbackRate.value);
                this._playbackRateValue = this._playbackRate.value;
            } else {
                let actualDuration = 0;
                let effectiveDuration = 0;

                this._playbackRate._eventList.forEach((event) => {
                    if (event.endTime !== undefined &&
                            event.startTime !== undefined &&
                            event.previous !== undefined &&
                            event.type === AudioParamEventType.LINEAR_RAMP_TO_VALUE) {
                        effectiveDuration += (event.endTime - event.startTime) * ((event.value + event.previous.value) / 2);
                        actualDuration += (event.endTime - event.startTime);
                    } else if (event.startTime !== undefined &&
                            event.type === AudioParamEventType.SET_VALUE) {
                        if (event.previous !== undefined && event.previous.endTime !== undefined) {
                            effectiveDuration += (event.startTime - event.previous.endTime) * event.previous.value;
                            actualDuration += (event.startTime - event.previous.endTime);
                        } else if (this._started !== null) {
                            effectiveDuration = (event.startTime - this._started.when) * this._playbackRate.value;
                            actualDuration = (event.startTime - this._started.when);
                        }
                    }
                });

                if (effectiveDuration < this._started.maxEffectiveDuration) {
                    actualDuration += (this._started.maxEffectiveDuration - effectiveDuration) / this._playbackRate._eventList.last().value;
                    effectiveDuration = this._started.maxEffectiveDuration;
                }

                when = this._started.when + actualDuration;
            }

            if (this._stopped !== null && this._stopped.when < when) {
                when = this._stopped.when;
            }

            this._onEndedTicket = this._deLorean.schedule(when, this._callOnEndedHandler.bind(this));
        }
    }

    start (when: number, offset: number, duration: number) {
        if (this._deLorean === undefined) {
            return;
        }

        if (arguments.length === 0) {
            when = 0;
        }

        if (when < this._deLorean.position) {
            when = this._deLorean.position;
        }

        if (arguments.length < 2) {
            offset = 0;
        }

        if (arguments.length < 3) {
            duration = (this.buffer === null) ? 0 : this.buffer.duration - offset;
        }

        const maxEffectiveDuration = Math.max(duration, (this.buffer === null) ? 0 : this.buffer.duration - offset);

        this._started = {
            duration,
            maxEffectiveDuration,
            when
        };

        this._scheduleOnEndedHandler();
    }

    stop (when: number) {
        if (this._deLorean === undefined) {
            return;
        }

        if (arguments.length === 0) {
            when = 0;
        }

        if (when < this._deLorean.position) {
            when = this._deLorean.position;
        }

        this._stopped = {
            when
        };

        this._scheduleOnEndedHandler();
    }

}

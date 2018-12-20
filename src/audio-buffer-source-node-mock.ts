import { stub } from 'sinon';
import { IAudioBufferSourceNode, TEndedEventHandler } from 'standardized-audio-context';
import { DeLorean } from 'vehicles';
import { AudioBufferMock } from './audio-buffer-mock';
import { AudioContextMock } from './audio-context-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { AudioParamEventType } from './helper/audio-param-event-type';
import { registrar } from './registrar';

export class AudioBufferSourceNodeMock extends AudioNodeMock implements IAudioBufferSourceNode {

    public loop: boolean;

    public loopEnd: number;

    public loopStart: number;

    private _buffer: null | AudioBufferMock;

    private _deLorean: undefined | DeLorean;

    private _detune: AudioParamMock;

    private _onended: null | TEndedEventHandler;

    private _onEndedTicket: null | number;

    private _playbackRate: AudioParamMock;

    private _playbackRateValue: number;

    private _started: null | { duration: number; maxEffectiveDuration: number; when: number };

    private _stopped: null | { when: number };

    constructor (context: AudioContextMock) {
        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        this._buffer = null;
        this._deLorean = <DeLorean> registrar.getVehicle(context);
        this._detune = new AudioParamMock({
            deLorean: this._deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38,
            onEventListUpdatedHandler: this._scheduleOnEndedHandler.bind(this),
            value: 0
        });
        this.loop = false;
        this.loopEnd = 0;
        this.loopStart = 0;
        this._onended = null;
        this._onEndedTicket = null;
        this._started = null;
        this._stopped = null;
        this._playbackRate = new AudioParamMock({
            deLorean: this._deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38,
            onEventListUpdatedHandler: this._scheduleOnEndedHandler.bind(this),
            value: 1
        });
        this._playbackRateValue = 1;

        stub(this, 'start')
            .callThrough();
        stub(this, 'stop')
            .callThrough();
    }

    get buffer (): null | AudioBufferMock {
        return this._buffer;
    }

    set buffer (value) {
        if (!(value instanceof AudioBufferMock)) {
            throw new TypeError('Failed to set the \'buffer\' property on \'AudioBufferSourceNode\': The provided value is not of type \'AudioBufferMock\'.'); // tslint:disable-line:max-line-length
        }

        this._buffer = value;
    }

    get detune (): AudioParamMock {
        return this._detune;
    }

    set detune (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get onended (): null | TEndedEventHandler {
        return this._onended;
    }

    set onended (value) {
        // @todo It is theoretically possible that the ended handler gets removed by using the public API.
        if (typeof this._onended === 'function') {
            this.removeEventListener('ended', this._onended);
        }

        if (typeof value === 'function' || value === null) {
            this._onended = value;

            if (typeof value === 'function') {
                this.addEventListener('ended', value);
            }
        }
    }

    get playbackRate (): AudioParamMock {
        return this._playbackRate;
    }

    set playbackRate (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    public start (when: number, offset: number, duration: number): void {
        if (this._deLorean === undefined) {
            return;
        }

        let sanitizedDuration = duration;
        let sanitizedOffset = offset;
        let sanitizedWhen = when;

        if (arguments.length === 0) {
            sanitizedWhen = 0;
        }

        if (when < this._deLorean.position) {
            sanitizedWhen = this._deLorean.position;
        }

        if (arguments.length < 2) {
            sanitizedOffset = 0;
        }

        if (arguments.length < 3) {
            sanitizedDuration = (this.buffer === null) ? 0 : this.buffer.duration - sanitizedOffset;
        }

        const maxEffectiveDuration = Math.max(sanitizedDuration, (this.buffer === null) ? 0 : this.buffer.duration - sanitizedOffset);

        this._started = {
            duration: sanitizedDuration,
            maxEffectiveDuration,
            when: sanitizedWhen
        };

        this._scheduleOnEndedHandler();
    }

    public stop (when: number): void {
        if (this._deLorean === undefined) {
            return;
        }

        let sanitizedWhen = when;

        if (arguments.length === 0) {
            sanitizedWhen = 0;
        }

        if (when < this._deLorean.position) {
            sanitizedWhen = this._deLorean.position;
        }

        this._stopped = {
            when: sanitizedWhen
        };

        this._scheduleOnEndedHandler();
    }

    private _callOnEndedHandler (): void {
        this.dispatchEvent(new Event('ended'));
    }

    private _scheduleOnEndedHandler (): void {
        if (this._deLorean === undefined) {
            return;
        }

        if (this._onEndedTicket !== null) {
            this._deLorean.cancel(this._onEndedTicket);
            this._onEndedTicket = null;
        }

        if (this._started !== null) {
            let when;

            // @todo Do not access private properties.
            if ((<any> this._playbackRate)._eventList.length === 0) {
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

                // @todo Do not access private properties.
                (<any> this._playbackRate)._eventList.forEach((event: any) => {
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
                    // @todo Do not access private properties.
                    actualDuration += (this._started.maxEffectiveDuration - effectiveDuration) / (<any> this._playbackRate)._eventList.last().value; // tslint:disable-line:max-line-length
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

}

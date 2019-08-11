import { AutomationEventList, TAutomationEvent } from 'automation-events';
import { stub } from 'sinon';
import { IAudioBufferSourceNode, IEndedEventHandler, IMinimalBaseAudioContext } from 'standardized-audio-context';
import { DeLorean } from 'vehicles';
import { AudioBufferMock } from './audio-buffer-mock';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class AudioBufferSourceNodeMock<T extends IMinimalBaseAudioContext> extends AudioNodeMock<T> implements IAudioBufferSourceNode<T> {

    public loop: boolean;

    public loopEnd: number;

    public loopStart: number;

    private _buffer: null | AudioBufferMock;

    private _deLorean: undefined | DeLorean;

    private _detune: AudioParamMock;

    private _onended: null | IEndedEventHandler<T, this>;

    private _onEndedTicket: null | number;

    private _playbackRate: AudioParamMock;

    private _playbackRateAutomationEventList: AutomationEventList;

    private _started: null | { duration: number; offset: number; when: number };

    private _stopped: null | { when: number };

    constructor (context: T) {
        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 0,
            numberOfOutputs: 1
        });

        const playbackRateAutomationEventList = new Proxy(new AutomationEventList(1), {
            get: (target, key): any => {
                if (key === 'add') {
                    return (automationEvent: TAutomationEvent) => {
                        const result = target.add(automationEvent);

                        this._scheduleOnEndedHandler();

                        return result;
                    };
                }

                return target[<keyof AutomationEventList> key];
            }
        });

        this._buffer = null;
        this._deLorean = <DeLorean> registrar.getVehicle(context);
        this._detune = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean: this._deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this.loop = false;
        this.loopEnd = 0;
        this.loopStart = 0;
        this._onended = null;
        this._onEndedTicket = null;
        this._started = null;
        this._stopped = null;
        this._playbackRate = new AudioParamMock({
            automationEventList: playbackRateAutomationEventList,
            deLorean: this._deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._playbackRateAutomationEventList = playbackRateAutomationEventList;

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

        this._scheduleOnEndedHandler();
    }

    get detune (): AudioParamMock {
        return this._detune;
    }

    set detune (value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get onended (): null | IEndedEventHandler<T, this> {
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

    public start (when?: number, offset?: number, duration?: number): void {
        if (this._deLorean === undefined) {
            return;
        }

        this._started = {
            duration: (duration === undefined) ? Number.POSITIVE_INFINITY : duration,
            offset: (offset === undefined) ? 0 : offset,
            when: (when === undefined || when < this._deLorean.position) ? this._deLorean.position : when
        };

        this._scheduleOnEndedHandler();
    }

    public stop (when = 0): void {
        if (this._deLorean === undefined) {
            return;
        }

        this._stopped = {
            when: (when < this._deLorean.position) ? this._deLorean.position : when
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
            const maxEffectiveDuration = Math.min(
                (this.buffer === null) ? 0 : this.buffer.duration - this._started.offset,
                this._started.duration
            );
            const renderQuantum = 128 / this.context.sampleRate;

            let when = this._started.when;
            let effectiveDuration = 0;
            let duration = 0;
            let i = Math.ceil(when / renderQuantum);

            if (effectiveDuration < maxEffectiveDuration) {
                const partialRenderQuantum = when % renderQuantum;

                if (partialRenderQuantum > 0) {
                    const value = this._playbackRateAutomationEventList.getValue(when - partialRenderQuantum);

                    [ duration, effectiveDuration ] = AudioBufferSourceNodeMock._accumulateDurationAndEffectiveDuration(
                        value,
                        (renderQuantum - partialRenderQuantum),
                        duration,
                        effectiveDuration,
                        maxEffectiveDuration
                    );
                }
            }

            while (effectiveDuration < maxEffectiveDuration) {
                const value = this._playbackRateAutomationEventList.getValue(i * renderQuantum);

                [ duration, effectiveDuration ] = AudioBufferSourceNodeMock._accumulateDurationAndEffectiveDuration(
                    value,
                    renderQuantum,
                    duration,
                    effectiveDuration,
                    maxEffectiveDuration
                );

                i += 1;
            }

            when += duration;

            if (this._stopped !== null && this._stopped.when < when) {
                when = this._stopped.when;
            }

            this._onEndedTicket = this._deLorean.schedule(when, this._callOnEndedHandler.bind(this));
        }
    }

    private static _accumulateDurationAndEffectiveDuration (
        value: number,
        quantum: number,
        duration: number,
        effectiveDuration: number,
        maxEffectiveDuration: number
    ): [ number, number ] {
        const effectiveQuantum = value * quantum;
        const newEffectiveDuration = effectiveDuration + effectiveQuantum;

        if (newEffectiveDuration > maxEffectiveDuration) {
            return [
                duration + ((maxEffectiveDuration - effectiveDuration) / effectiveQuantum) * quantum,
                maxEffectiveDuration
            ];
        }

        return [
            duration + quantum,
            newEffectiveDuration
        ];
    }

}

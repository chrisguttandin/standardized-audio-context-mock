// tslint:disable-next-line:comment-format
// http://webaudio.github.io/web-audio-api/#the-audioparam-interface

export class AudioParamEventType {

    static get EXPONENTIAL_RAMP_TO_VALUE () {
        return 'exponentialRampToValue';
    }

    static get LINEAR_RAMP_TO_VALUE () {
        return 'linearRampToValue';
    }

    static get SET_TARGET () {
        return 'setTarget';
    }

    static get SET_VALUE () {
        return 'setValue';
    }

    static get SET_VALUE_CURVE () {
        return 'setValueCurve';
    }

}

// tslint:disable-next-line:comment-format
// http://webaudio.github.io/web-audio-api/#the-audioparam-interface

export class AudioParamEventType {

    static get EXPONENTIAL_RAMP_TO_VALUE (): 'exponentialRampToValue' {
        return 'exponentialRampToValue';
    }

    static get LINEAR_RAMP_TO_VALUE (): 'linearRampToValue' {
        return 'linearRampToValue';
    }

    static get SET_TARGET (): 'setTarget' {
        return 'setTarget';
    }

    static get SET_VALUE (): 'setValue' {
        return 'setValue';
    }

    static get SET_VALUE_CURVE (): 'setValueCurve' {
        return 'setValueCurve';
    }

}

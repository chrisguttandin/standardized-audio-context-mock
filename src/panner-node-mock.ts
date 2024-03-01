import { AutomationEventList } from 'automation-events';
import { IPannerNode, TContext, TPanningModelType } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class PannerNodeMock<T extends TContext> extends AudioNodeMock<T> implements IPannerNode<T> {
    private _coneInnerAngle: number;
    private _coneOuterAngle: number;
    private _coneOuterGain: number;
    private _distanceModel: 'linear' | 'inverse' | 'exponential';
    private _maxDistance: number;
    private _orientationX: AudioParamMock;
    private _orientationY: AudioParamMock;
    private _orientationZ: AudioParamMock;
    private _panningModel: TPanningModelType;
    private _positionX: AudioParamMock;
    private _positionY: AudioParamMock;
    private _positionZ: AudioParamMock;
    private _refDistance: number;
    private _rolloffFactor: number;

    constructor(context: T) {
        const deLorean = registrar.getDeLorean(context);
        super({
            channelCount: 2,
            channelCountMode: 'clamped-max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 1
        });
        this._orientationX = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._orientationY = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._orientationZ = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._positionX = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._positionY = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._positionZ = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38
        });
        this._coneInnerAngle = 360;
        this._coneOuterAngle = 360;
        this._coneOuterGain = 0;
        this._distanceModel = 'inverse';
        this._maxDistance = 10000;
        this._panningModel = 'equalpower';
        this._refDistance = 1;
        this._rolloffFactor = 1;
        registrar.addAudioNode(context, 'PannerNode', this);
    }

    get coneInnerAngle(): number {
        return this._coneInnerAngle;
    }

    set coneInnerAngle(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get coneOuterAngle(): number {
        return this._coneOuterAngle;
    }

    set coneOuterAngle(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get coneOuterGain(): number {
        return this._coneOuterGain;
    }

    set coneOuterGain(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get distanceModel(): 'linear' | 'inverse' | 'exponential' {
        return this._distanceModel;
    }

    set distanceModel(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get maxDistance(): number {
        return this._maxDistance;
    }

    set maxDistance(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get orientationX(): AudioParamMock {
        return this._orientationX;
    }

    set orientationX(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get orientationY(): AudioParamMock {
        return this._orientationY;
    }

    set orientationY(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get orientationZ(): AudioParamMock {
        return this._orientationZ;
    }

    set orientationZ(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get panningModel(): TPanningModelType {
        return this._panningModel;
    }

    set panningModel(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get positionX(): AudioParamMock {
        return this._positionX;
    }

    set positionX(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get positionY(): AudioParamMock {
        return this._positionY;
    }

    set positionY(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get positionZ(): AudioParamMock {
        return this._positionZ;
    }

    set positionZ(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get refDistance(): number {
        return this._refDistance;
    }

    set refDistance(value) {
        value; // tslint:disable-line:no-unused-expression
    }

    get rolloffFactor(): number {
        return this._rolloffFactor;
    }

    set rolloffFactor(value) {
        value; // tslint:disable-line:no-unused-expression
    }
}

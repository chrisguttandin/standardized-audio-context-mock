import { IGainNode, IMinimalBaseAudioContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class GainNodeMock<T extends IMinimalBaseAudioContext> extends AudioNodeMock<T> implements IGainNode<T> {

    private _gain: AudioParamMock;

    constructor (context: T) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCount: 2,
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._gain = new AudioParamMock({
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38,
            onEventListUpdatedHandler (): any { }, // tslint:disable-line:no-empty
            value: 1
        });
    }

    get gain (): AudioParamMock {
        return this._gain;
    }

    set gain (value) {
        value; // tslint:disable-line:no-unused-expression
    }

}

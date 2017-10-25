import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';
import { AudioContextMock } from './audio-context-mock';

export class GainNodeMock extends AudioNodeMock {

    private _gain: AudioParamMock;

    constructor (context: AudioContextMock) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCountMode: 'max',
            channelInterpretation: 'speakers',
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._gain = new AudioParamMock({
            deLorean,
            maxValue: 3.4028234663852886e38,
            minValue: -3.4028234663852886e38,
            onEventListUpdatedHandler: () => {},
            value: 1
        });
    }

    get gain () {
        return this._gain;
    }

    set gain (value: AudioParamMock) {
        value;
    }

}

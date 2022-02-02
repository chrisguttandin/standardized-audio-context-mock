import { AutomationEventList } from 'automation-events';
import { IStereoPannerNode, TContext } from 'standardized-audio-context';
import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';
import { registrar } from './registrar';

export class StereoPannerNodeMock<T extends TContext> extends AudioNodeMock<T> implements IStereoPannerNode<T> {
    private _pan: AudioParamMock;

    constructor(context: T) {
        const deLorean = registrar.getDeLorean(context);

        super({
            channelCount: 2,
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            context,
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this._pan = new AudioParamMock({
            automationEventList: new AutomationEventList(0),
            deLorean,
            maxValue: 1,
            minValue: -1
        });

        registrar.addAudioNode(context, 'StereoPannerNode', this);
    }

    get pan(): AudioParamMock {
        return this._pan;
    }

    set pan(value) {
        value; // tslint:disable-line:no-unused-expression
    }
}

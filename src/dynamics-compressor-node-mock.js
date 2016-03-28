import { AudioNodeMock } from './audio-node-mock';
import { AudioParamMock } from './audio-param-mock';

export class DynamicsCompressorNodeMock extends AudioNodeMock {

    constructor (options) {
        super({
            channelCountMode: 'explicit',
            channelInterpretation: 'speakers',
            numberOfInputs: 1,
            numberOfOutputs: 1
        });

        this.threshold = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.knee = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.ratio = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.reduction = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.attack = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
        this.release = new AudioParamMock({
            onEventListUpdatedHandler: () => {},
            scheduler: options.scheduler,
            value: 1
        });
    }
}

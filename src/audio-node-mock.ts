import { SinonSpy, spy } from 'sinon';

export class AudioNodeMock {

    public channelCount: number | undefined;

    public channelCountMode: string | undefined;

    public channelInterpretation: string | undefined;

    public connect: SinonSpy;

    public disconnect: SinonSpy;

    public numberOfInputs: number;

    public numberOfOutputs: number;

    constructor (options: { channelCount?: number, channelCountMode?: string, channelInterpretation?: string, connect?: SinonSpy, disconnect?: SinonSpy, numberOfInputs: number, numberOfOutputs: number }) {
        this.channelCount = options.channelCount;
        this.channelCountMode = options.channelCountMode;
        this.channelInterpretation = options.channelInterpretation;
        this.connect = spy();
        this.disconnect = spy();
        this.numberOfInputs = options.numberOfInputs;
        this.numberOfOutputs = options.numberOfOutputs;
    }

}

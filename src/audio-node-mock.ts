import { SinonSpy, spy } from 'sinon';
import { IAudioNode, TChannelCountMode, TChannelInterpretation, TContext } from 'standardized-audio-context';
import { EventTarget } from './event-target';

export class AudioNodeMock<T extends TContext> extends EventTarget implements IAudioNode<T> {

    public channelCount: number;

    public channelCountMode: TChannelCountMode;

    public channelInterpretation: TChannelInterpretation;

    public connect: SinonSpy;

    public disconnect: SinonSpy;

    public numberOfInputs: number;

    public numberOfOutputs: number;

    private _context: T;

    constructor (options: { channelCount: number; channelCountMode: TChannelCountMode; channelInterpretation: TChannelInterpretation; connect?: SinonSpy; context: T; disconnect?: SinonSpy; numberOfInputs: number; numberOfOutputs: number }) { // tslint:disable-line:max-line-length
        super();

        this.channelCount = options.channelCount;
        this.channelCountMode = options.channelCountMode;
        this.channelInterpretation = options.channelInterpretation;
        this._context = options.context;
        this.connect = spy();
        this.disconnect = spy();
        this.numberOfInputs = options.numberOfInputs;
        this.numberOfOutputs = options.numberOfOutputs;
    }

    get context (): T {
        return this._context;
    }

}

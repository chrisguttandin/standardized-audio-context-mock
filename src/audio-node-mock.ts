import { SinonSpy, spy } from 'sinon';
import { IAudioNode, TChannelCountMode, TChannelInterpretation, TContext } from 'standardized-audio-context';
import { AudioContextMock } from './audio-context-mock';
import { EventTarget } from './event-target';

export class AudioNodeMock extends EventTarget implements IAudioNode {

    public channelCount: number;

    public channelCountMode: TChannelCountMode;

    public channelInterpretation: TChannelInterpretation;

    public connect: SinonSpy;

    public disconnect: SinonSpy;

    public numberOfInputs: number;

    public numberOfOutputs: number;

    private _context: AudioContextMock;

    constructor (options: { channelCount: number, channelCountMode: TChannelCountMode, channelInterpretation: TChannelInterpretation, context: AudioContextMock, connect?: SinonSpy, disconnect?: SinonSpy, numberOfInputs: number, numberOfOutputs: number }) { // tslint:disable-line:max-line-length
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

    get context () {
        // @todo Remove this ugly cast again when the context implements the TContext interface.
        return <TContext> (<any> this._context);
    }

}

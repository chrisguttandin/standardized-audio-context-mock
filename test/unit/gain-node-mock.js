import { AudioContextMock } from '../../src/audio-context-mock';
import { GainNodeMock } from '../../src/gain-node-mock';
import { registrar } from '../../src/registrar';

describe('GainNodeMock', () => {
    let gainNodeMock;

    beforeEach(() => {
        const context = new AudioContextMock();

        gainNodeMock = new GainNodeMock(context);
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(gainNodeMock.context, 'GainNode')).to.deep.equal([gainNodeMock]);
    });
});

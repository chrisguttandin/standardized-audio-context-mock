import { AudioContextMock } from '../../src/audio-context-mock';
import { MediaElementAudioSourceNodeMock } from '../../src/media-element-audio-source-node-mock';
import { registrar } from '../../src/registrar';

describe('MediaElementAudioSourceNodeMock', () => {
    let mediaElementAudioSourceNodeMock;

    beforeEach(() => {
        const context = new AudioContextMock();
        const mediaElement = 'a fake media element';

        mediaElementAudioSourceNodeMock = new MediaElementAudioSourceNodeMock(context, { mediaElement });
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(mediaElementAudioSourceNodeMock.context, 'MediaElementAudioSourceNode')).to.deep.equal([
            mediaElementAudioSourceNodeMock
        ]);
    });
});

import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { StereoPannerNodeMock } from '../../src/stereo-panner-node-mock';
import { registrar } from '../../src/registrar';

describe('StereoPannerNodeMock', () => {
    let stereoPannerNodeMock;

    beforeEach(() => {
        const context = new AudioContextMock();

        stereoPannerNodeMock = new StereoPannerNodeMock(context);
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(stereoPannerNodeMock.context, 'StereoPannerNode')).to.deep.equal([stereoPannerNodeMock]);
    });

    describe('pan', () => {
        it('should be readonly', () => {
            stereoPannerNodeMock.pan = 'new value';

            expect(stereoPannerNodeMock.pan).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(stereoPannerNodeMock.pan).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 0', () => {
            expect(stereoPannerNodeMock.pan.defaultValue).to.equal(0);
        });

        it('should have a value of 0', () => {
            expect(stereoPannerNodeMock.pan.value).to.equal(0);
        });
    });
});

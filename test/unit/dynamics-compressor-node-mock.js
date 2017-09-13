import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { DynamicsCompressorNodeMock } from '../../src/dynamics-compressor-node-mock';

describe('DynamicsCompressorNodeMock', () => {

    let dynamicsCompressorNodeMock;

    beforeEach(() => {
        const context = new AudioContextMock();

        dynamicsCompressorNodeMock = new DynamicsCompressorNodeMock(context);
    });

    describe('attack', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.attack = 'new value';

            expect(dynamicsCompressorNodeMock.attack).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(dynamicsCompressorNodeMock.attack).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 0.003', () => {
            expect(dynamicsCompressorNodeMock.attack.defaultValue).to.equal(0.003);
        });

        it('should have a value of 0.003', () => {
            expect(dynamicsCompressorNodeMock.attack.value).to.equal(0.003);
        });

    });

    describe('knee', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.knee = 'new value';

            expect(dynamicsCompressorNodeMock.knee).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(dynamicsCompressorNodeMock.knee).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 30', () => {
            expect(dynamicsCompressorNodeMock.knee.defaultValue).to.equal(30);
        });

        it('should have a value of 30', () => {
            expect(dynamicsCompressorNodeMock.knee.value).to.equal(30);
        });

    });

    describe('ratio', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.ratio = 'new value';

            expect(dynamicsCompressorNodeMock.ratio).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(dynamicsCompressorNodeMock.ratio).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 12', () => {
            expect(dynamicsCompressorNodeMock.ratio.defaultValue).to.equal(12);
        });

        it('should have a value of 12', () => {
            expect(dynamicsCompressorNodeMock.ratio.value).to.equal(12);
        });

    });

    describe('reduction', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.reduction = 'new value';

            expect(dynamicsCompressorNodeMock.reduction).to.not.equal('new value');
        });

        it('should have a value of 0', () => {
            expect(dynamicsCompressorNodeMock.reduction).to.equal(0);
        });

    });

    describe('release', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.release = 'new value';

            expect(dynamicsCompressorNodeMock.release).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(dynamicsCompressorNodeMock.release).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of 0.25', () => {
            expect(dynamicsCompressorNodeMock.release.defaultValue).to.equal(0.25);
        });

        it('should have a value of 0.25', () => {
            expect(dynamicsCompressorNodeMock.release.value).to.equal(0.25);
        });

    });

    describe('threshold', () => {

        it('should be readonly', () => {
            dynamicsCompressorNodeMock.threshold = 'new value';

            expect(dynamicsCompressorNodeMock.threshold).to.not.equal('new value');
        });

        it('should be a instance of AudioParamMock', () => {
            expect(dynamicsCompressorNodeMock.threshold).to.be.an.instanceOf(AudioParamMock);
        });

        it('should have a default value of -24', () => {
            expect(dynamicsCompressorNodeMock.threshold.defaultValue).to.equal(-24);
        });

        it('should have a value of -24', () => {
            expect(dynamicsCompressorNodeMock.threshold.value).to.equal(-24);
        });

    });

});

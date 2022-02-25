import { AudioContext, DynamicsCompressorNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { DynamicsCompressorNodeMock } from '../../src/dynamics-compressor-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('DynamicsCompressorNodeMock', () => {
    let audioContextMock;
    let dynamicsCompressorNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        dynamicsCompressorNodeMock = new DynamicsCompressorNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the DynamicsCompressorNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

        for (const key of getAllKeys(dynamicsCompressorNode)) {
            const property = dynamicsCompressorNode[key];

            if (property === audioContext) {
                expect(dynamicsCompressorNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(dynamicsCompressorNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(dynamicsCompressorNodeMock[key]).to.be.a('function');
            } else {
                expect(dynamicsCompressorNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'DynamicsCompressorNode')).to.deep.equal([dynamicsCompressorNodeMock]);
    });

    describe('attack', () => {
        it('should be readonly', () => {
            dynamicsCompressorNodeMock.attack = 'new value';

            expect(dynamicsCompressorNodeMock.attack).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode.attack)) {
                const property = dynamicsCompressorNode.attack[key];

                if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock.attack[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock.attack[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('knee', () => {
        it('should be readonly', () => {
            dynamicsCompressorNodeMock.knee = 'new value';

            expect(dynamicsCompressorNodeMock.knee).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode.knee)) {
                const property = dynamicsCompressorNode.knee[key];

                if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock.knee[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock.knee[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('ratio', () => {
        it('should be readonly', () => {
            dynamicsCompressorNodeMock.ratio = 'new value';

            expect(dynamicsCompressorNodeMock.ratio).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode.ratio)) {
                const property = dynamicsCompressorNode.ratio[key];

                if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock.ratio[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock.ratio[key]).to.equal(property);
                }
            }

            audioContext.close();
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

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode.release)) {
                const property = dynamicsCompressorNode.release[key];

                if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock.release[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock.release[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('threshold', () => {
        it('should be readonly', () => {
            dynamicsCompressorNodeMock.threshold = 'new value';

            expect(dynamicsCompressorNodeMock.threshold).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const dynamicsCompressorNode = new DynamicsCompressorNode(audioContext);

            for (const key of getAllKeys(dynamicsCompressorNode.threshold)) {
                const property = dynamicsCompressorNode.threshold[key];

                if (typeof property === 'function') {
                    expect(dynamicsCompressorNodeMock.threshold[key]).to.be.a('function');
                } else {
                    expect(dynamicsCompressorNodeMock.threshold[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('connect()', () => {
        for (const type of ['AudioNode', 'AudioParam']) {
            describe(`with an ${type}`, () => {
                let audioNodeOrAudioParam;

                beforeEach(() => {
                    const gainNode = audioContextMock.createGain();

                    audioNodeOrAudioParam = type === 'AudioNode' ? gainNode : gainNode.gain;
                });

                if (type === 'AudioNode') {
                    it('should be chainable', () => {
                        expect(dynamicsCompressorNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(dynamicsCompressorNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });
});

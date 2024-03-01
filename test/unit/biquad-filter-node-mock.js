import { AudioContext, BiquadFilterNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { BiquadFilterNodeMock } from '../../src/biquad-filter-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('BiquadFilterNodeMock', () => {
    let audioContextMock;
    let biquadFilterNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        biquadFilterNodeMock = new BiquadFilterNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the BiquadFilterNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const biquadFilterNode = new BiquadFilterNode(audioContext);

        for (const key of getAllKeys(biquadFilterNode)) {
            const property = biquadFilterNode[key];

            if (property === audioContext) {
                expect(biquadFilterNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(biquadFilterNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(biquadFilterNodeMock[key]).to.be.a('function');
            } else {
                expect(biquadFilterNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'BiquadFilterNode')).to.deep.equal([biquadFilterNodeMock]);
    });

    describe('Q', () => {
        it('should be readonly', () => {
            biquadFilterNodeMock.Q = 'new value';

            expect(biquadFilterNodeMock.Q).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const biquadFilterNode = new BiquadFilterNode(audioContext);

            for (const key of getAllKeys(biquadFilterNode.Q)) {
                const property = biquadFilterNode.Q[key];

                if (typeof property === 'function') {
                    expect(biquadFilterNodeMock.Q[key]).to.be.a('function');
                } else {
                    expect(biquadFilterNodeMock.Q[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('detune', () => {
        it('should be readonly', () => {
            biquadFilterNodeMock.detune = 'new value';

            expect(biquadFilterNodeMock.detune).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const biquadFilterNode = new BiquadFilterNode(audioContext);

            for (const key of getAllKeys(biquadFilterNode.detune)) {
                const property = biquadFilterNode.detune[key];

                if (typeof property === 'function') {
                    expect(biquadFilterNodeMock.detune[key]).to.be.a('function');
                } else {
                    expect(biquadFilterNodeMock.detune[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('frequency', () => {
        it('should be readonly', () => {
            biquadFilterNodeMock.frequency = 'new value';

            expect(biquadFilterNodeMock.frequency).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const biquadFilterNode = new BiquadFilterNode(audioContext);

            for (const key of getAllKeys(biquadFilterNode.frequency)) {
                const property = biquadFilterNode.frequency[key];

                if (typeof property === 'function') {
                    expect(biquadFilterNodeMock.frequency[key]).to.be.a('function');
                } else {
                    expect(biquadFilterNodeMock.frequency[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('gain', () => {
        it('should be readonly', () => {
            biquadFilterNodeMock.gain = 'new value';

            expect(biquadFilterNodeMock.gain).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const biquadFilterNode = new BiquadFilterNode(audioContext);

            for (const key of getAllKeys(biquadFilterNode.gain)) {
                const property = biquadFilterNode.gain[key];

                if (typeof property === 'function') {
                    expect(biquadFilterNodeMock.gain[key]).to.be.a('function');
                } else {
                    expect(biquadFilterNodeMock.gain[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('type', () => {
        it('should be assignable to another type', () => {
            const type = (biquadFilterNodeMock.type = 'allpass'); // eslint-disable-line no-multi-assign

            expect(type).to.equal('allpass');
            expect(biquadFilterNodeMock.type).to.equal('allpass');
        });

        it('should not be assignable to something else', () => {
            const string = 'none of the accepted types';
            const type = (biquadFilterNodeMock.type = string); // eslint-disable-line no-multi-assign

            expect(type).to.equal(string);
            expect(biquadFilterNodeMock.type).to.equal('lowpass');
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
                        expect(biquadFilterNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(biquadFilterNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });

    describe('disconnect()', () => {
        for (const type of ['AudioNode', 'AudioParam']) {
            describe(`with an ${type}`, () => {
                let audioNodeOrAudioParam;

                beforeEach(() => {
                    const gainNode = audioContextMock.createGain();

                    audioNodeOrAudioParam = type === 'AudioNode' ? gainNode : gainNode.gain;

                    biquadFilterNodeMock.connect(audioNodeOrAudioParam);
                });

                it('should be disconnectable', () => {
                    expect(biquadFilterNodeMock.disconnect(audioNodeOrAudioParam)).to.be.undefined;
                });
            });
        }
    });
});

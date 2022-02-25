import { AudioContext, OscillatorNode, isAnyAudioParam } from 'standardized-audio-context';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { OscillatorNodeMock } from '../../src/oscillator-node-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';

describe('OscillatorNodeMock', () => {
    let audioContextMock;
    let oscillatorNodeMock;

    beforeEach(() => {
        audioContextMock = new AudioContextMock();
        oscillatorNodeMock = new OscillatorNodeMock(audioContextMock);
    });

    it('should have all methods and properties of the OscillatorNode interface', () => {
        const audioContext = new AudioContext({ sampleRate: 44100 });
        const oscillatorNode = new OscillatorNode(audioContext);

        for (const key of getAllKeys(oscillatorNode)) {
            const property = oscillatorNode[key];

            if (property === audioContext) {
                expect(oscillatorNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(oscillatorNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(oscillatorNodeMock[key]).to.be.a('function');
            } else {
                expect(oscillatorNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'OscillatorNode')).to.deep.equal([oscillatorNodeMock]);
    });

    describe('detune', () => {
        it('should be readonly', () => {
            oscillatorNodeMock.detune = 'new value';

            expect(oscillatorNodeMock.detune).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const oscillatorNode = new OscillatorNode(audioContext);

            for (const key of getAllKeys(oscillatorNode.detune)) {
                const property = oscillatorNode.detune[key];

                if (typeof property === 'function') {
                    expect(oscillatorNodeMock.detune[key]).to.be.a('function');
                } else {
                    expect(oscillatorNodeMock.detune[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('frequency', () => {
        it('should be readonly', () => {
            oscillatorNodeMock.frequency = 'new value';

            expect(oscillatorNodeMock.frequency).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext({ sampleRate: 44100 });
            const oscillatorNode = new OscillatorNode(audioContext);

            for (const key of getAllKeys(oscillatorNode.frequency)) {
                const property = oscillatorNode.frequency[key];

                if (typeof property === 'function') {
                    expect(oscillatorNodeMock.frequency[key]).to.be.a('function');
                } else {
                    expect(oscillatorNodeMock.frequency[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('onended', () => {
        it('should be null', () => {
            expect(oscillatorNodeMock.onended).to.be.null;
        });

        it('should be assignable to a function', () => {
            const fn = () => {}; // eslint-disable-line unicorn/consistent-function-scoping
            const onended = (oscillatorNodeMock.onended = fn); // eslint-disable-line no-multi-assign

            expect(onended).to.equal(fn);
            expect(oscillatorNodeMock.onended).to.equal(fn);
        });

        it('should be assignable to null', () => {
            const onended = (oscillatorNodeMock.onended = null); // eslint-disable-line no-multi-assign

            expect(onended).to.be.null;
            expect(oscillatorNodeMock.onended).to.be.null;
        });

        it('should not be assignable to something else', () => {
            const string = 'no function or null value';

            oscillatorNodeMock.onended = () => {};

            const onended = (oscillatorNodeMock.onended = string); // eslint-disable-line no-multi-assign

            expect(onended).to.equal(string);
            expect(oscillatorNodeMock.onended).to.be.null;
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
                        expect(oscillatorNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(oscillatorNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });
});

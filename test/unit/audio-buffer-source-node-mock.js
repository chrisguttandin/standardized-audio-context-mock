import { AudioBuffer, AudioBufferSourceNode, AudioContext, isAnyAudioParam } from 'standardized-audio-context';
import { AudioBufferMock } from '../../src/audio-buffer-mock';
import { AudioBufferSourceNodeMock } from '../../src/audio-buffer-source-node-mock';
import { AudioContextMock } from '../../src/audio-context-mock';
import { AudioParamMock } from '../../src/audio-param-mock';
import { getAllKeys } from '../helpers/get-all-keys';
import { registrar } from '../../src/registrar';
import { spy } from 'sinon';

describe('AudioBufferSourceNodeMock', () => {
    let audioBufferSourceNodeMock;
    let audioContextMock;
    let vehicle;

    beforeEach(() => {
        audioContextMock = new AudioContextMock({ sampleRate: 22050 });
        audioBufferSourceNodeMock = new AudioBufferSourceNodeMock(audioContextMock, {
            buffer: new AudioBufferMock({
                length: 220500,
                numberOfChannels: 2,
                sampleRate: 22050
            })
        });

        vehicle = registrar.getVehicle(audioContextMock);
    });

    it('should have all methods and properties of the AudioBufferSourceNode interface', () => {
        const audioContext = new AudioContext();
        const audioBufferSourceNode = new AudioBufferSourceNode(audioContext, {
            buffer: new AudioBuffer({
                length: 441000,
                numberOfChannels: 2,
                sampleRate: 44100
            })
        });

        for (const key of getAllKeys(audioBufferSourceNode)) {
            const property = audioBufferSourceNode[key];

            if (property instanceof AudioBuffer) {
                expect(audioBufferSourceNodeMock[key]).to.be.an.instanceOf(AudioBufferMock);
            } else if (property === audioContext) {
                expect(audioBufferSourceNodeMock[key]).to.equal(audioContextMock);
            } else if (isAnyAudioParam(property)) {
                expect(audioBufferSourceNodeMock[key]).to.be.an.instanceOf(AudioParamMock);
            } else if (typeof property === 'function') {
                expect(audioBufferSourceNodeMock[key]).to.be.a('function');
            } else {
                expect(audioBufferSourceNodeMock[key]).to.equal(property);
            }
        }

        audioContext.close();
    });

    it('should register the created instance', () => {
        expect(registrar.getAudioNodes(audioContextMock, 'AudioBufferSourceNode')).to.deep.equal([audioBufferSourceNodeMock]);
    });

    describe('detune', () => {
        it('should be readonly', () => {
            audioBufferSourceNodeMock.detune = 'new value';

            expect(audioBufferSourceNodeMock.detune).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext();
            const audioBufferSourceNode = new AudioBufferSourceNode(audioContext, {
                buffer: new AudioBuffer({
                    length: 441000,
                    numberOfChannels: 2,
                    sampleRate: 44100
                })
            });

            for (const key of getAllKeys(audioBufferSourceNode.detune)) {
                const property = audioBufferSourceNode.detune[key];

                if (typeof property === 'function') {
                    expect(audioBufferSourceNodeMock.detune[key]).to.be.a('function');
                } else {
                    expect(audioBufferSourceNodeMock.detune[key]).to.equal(property);
                }
            }

            audioContext.close();
        });
    });

    describe('onended', () => {
        it('should be null', () => {
            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should be assignable to a function', () => {
            const fn = () => {}; // eslint-disable-line unicorn/consistent-function-scoping
            const onended = (audioBufferSourceNodeMock.onended = fn); // eslint-disable-line no-multi-assign

            expect(onended).to.equal(fn);
            expect(audioBufferSourceNodeMock.onended).to.equal(fn);
        });

        it('should be assignable to null', () => {
            const onended = (audioBufferSourceNodeMock.onended = null); // eslint-disable-line no-multi-assign

            expect(onended).to.be.null;
            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it('should not be assignable to something else', () => {
            const string = 'no function or null value';

            audioBufferSourceNodeMock.onended = () => {};

            const onended = (audioBufferSourceNodeMock.onended = string); // eslint-disable-line no-multi-assign

            expect(onended).to.equal(string);
            expect(audioBufferSourceNodeMock.onended).to.be.null;
        });

        it("should reschedule the onended event when setting playbackRate's value property before playing", () => {
            const onended = spy();

            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.value = 2;

            vehicle.travel(4);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

        it("should reschedule the onended event when setting playbackRate's value property while playing", () => {
            const onended = spy();

            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);

            vehicle.travel(5);
            audioBufferSourceNodeMock.playbackRate.value = 2;
            vehicle.travel(2);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.51);

            expect(onended).to.have.been.calledOnce;
        });

        it("should reschedule the onended event when calling playbackRate's setValueAtTime() method before playing", () => {
            const onended = spy();

            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 5);

            vehicle.travel(7);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.51);

            expect(onended).to.have.been.calledOnce;
        });

        it("should reschedule the onended event when calling playbackRate's setValueAtTime() method multiple times before playing", () => {
            const onended = spy();

            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(2, 2);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 4);

            vehicle.travel(7.5);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.51);

            expect(onended).to.have.been.calledOnce;
        });

        it("should reschedule the onended event when calling playbackRate's linearRampToValueAtTime() method before playing", () => {
            const onended = spy();

            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.playbackRate.setValueAtTime(1, 0);
            audioBufferSourceNodeMock.playbackRate.linearRampToValueAtTime(1.5, 1);

            vehicle.travel(6.8);

            expect(onended).to.have.not.been.called;

            vehicle.travel(0.06);

            expect(onended).to.have.been.calledOnce;
        });
    });

    describe('playbackRate', () => {
        it('should be readonly', () => {
            audioBufferSourceNodeMock.playbackRate = 'new value';

            expect(audioBufferSourceNodeMock.playbackRate).to.not.equal('new value');
        });

        it('should have all methods and properties of the AudioParam interface', () => {
            const audioContext = new AudioContext();
            const audioBufferSourceNode = new AudioBufferSourceNode(audioContext, {
                buffer: new AudioBuffer({
                    length: 441000,
                    numberOfChannels: 2,
                    sampleRate: 44100
                })
            });

            for (const key of getAllKeys(audioBufferSourceNode.playbackRate)) {
                const property = audioBufferSourceNode.playbackRate[key];

                if (typeof property === 'function') {
                    expect(audioBufferSourceNodeMock.playbackRate[key]).to.be.a('function');
                } else {
                    expect(audioBufferSourceNodeMock.playbackRate[key]).to.equal(property);
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
                        expect(audioBufferSourceNodeMock.connect(audioNodeOrAudioParam)).to.equal(audioNodeOrAudioParam);
                    });
                } else {
                    it('should not be chainable', () => {
                        expect(audioBufferSourceNodeMock.connect(audioNodeOrAudioParam)).to.be.undefined;
                    });
                }
            });
        }
    });

    describe('start()', () => {
        let onended;

        beforeEach(() => {
            onended = spy();
        });

        it('should schedule the onended event when started now', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0);

            vehicle.travel(9);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });

        it('should schedule the onended event when started in the future', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(5);

            vehicle.travel(14);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });
    });

    describe('stop()', () => {
        let onended;

        beforeEach(() => {
            onended = spy();
        });

        it('should reschedule the onended event', () => {
            audioBufferSourceNodeMock.onended = onended;
            audioBufferSourceNodeMock.start(0, 0, 10);
            audioBufferSourceNodeMock.stop(5);

            vehicle.travel(4);

            expect(onended).to.have.not.been.called;

            vehicle.travel(1);

            expect(onended).to.have.been.calledOnce;
        });
    });
});

import { TContext } from 'standardized-audio-context';
import { IAudioNodeMap } from '../interfaces';

export type TAudioNodes<T extends TContext> = IAudioNodeMap<T>[keyof IAudioNodeMap<T>];

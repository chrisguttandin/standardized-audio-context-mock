import { IDefinition } from '../interfaces';

export class AudioEventScheduler {

    public currentTime: number;

    private _definitions: IDefinition[] = [];

    constructor () {
        this.currentTime = 0;
        this._definitions = [];
    }

    get nextTime () {
        return (this._definitions.length > 0) ? this._definitions[0].when : Number.POSITIVE_INFINITY;
    }

    public cancel (definition: IDefinition) {
        const index = this._definitions.indexOf(definition);

        if (index > -1) {
            this._definitions.splice(index, 1);
        }
    }

    public flush (elapsedTime: number) {
        const currentTimeAfterwards = this.currentTime += elapsedTime;

        while (this._definitions.length > 0 && this._definitions[0].when <= currentTimeAfterwards) {
            // TypeScript needs to be convinced that definition is not undefined.
            const { func, when } = <IDefinition> this._definitions.shift();

            this.currentTime = when;
            func();
        }

        this.currentTime = currentTimeAfterwards;
    }

    public reset () {
        this.currentTime = 0;
        this._definitions.length = 0;
    }

    public schedule (definition: IDefinition) {
        this._definitions.push(definition);

        this._definitions.sort((a, b) => a.when - b.when);
    }

}

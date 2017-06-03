import { IDefinition } from '../interfaces';

export class AudioEventScheduler {

    public currentTime: number;

    private _definitions: IDefinition[] = [];

    constructor () {
        this.currentTime = 0;
        this._definitions = [];
    }

    public cancel (definition: IDefinition) {
        this._definitions.some((d) => {
            const found = (definition === d);

            if (found) {
                this._definitions.splice(this._definitions.indexOf(d), 1);
            }

            return found;
        });
    }

    public flush (elapsedTime: number) {
        const currentTimeAfterwards = this.currentTime += elapsedTime;

        while (this._definitions.length && this._definitions[0].when <= currentTimeAfterwards) {
            // TypeScript needs to be convinced that definition is not undefined.
            const definition = <IDefinition> this._definitions.shift();

            this.currentTime = definition.when;
            definition.func();
        }

        this.currentTime = currentTimeAfterwards;
    }

    public reset () {
        this.currentTime = 0;
        this._definitions = [];
    }

    public schedule (definition: IDefinition) {
        this._definitions.push(definition);

        this._definitions.sort((a, b) => a.when - b.when);
    }

}

export class AudioEventScheduler {

    constructor () {
        this.currentTime = 0;
        this._definitions = [];
    }

    cancel (definition) {
        var found;

        this._definitions.some((d) => {
            found = (definition === d);

            if (found) {
                this._definitions.splice(this._definitions.indexOf(d), 1);
            }

            return found;
        });
    }

    flush (elapsedTime) {
        var currentTimeAfterwards,
            definition;

        currentTimeAfterwards = this.currentTime += elapsedTime;

        while (this._definitions.length && this._definitions[0].when <= currentTimeAfterwards) {
            definition = this._definitions.shift();
            this.currentTime = definition.when;
            definition.func();
        }

        this.currentTime = currentTimeAfterwards;
    }

    reset () {
        this.currentTime = 0;
        this._definitions = [];
    }

    schedule (definition) {
        this._definitions.push(definition);

        this._definitions.sort((a, b) => a.when - b.when);
    }

}

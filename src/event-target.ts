export class EventTarget {

    private _eventListeners: Map<string, Set<EventListener>>;

    constructor () {
        this._eventListeners = new Map();
    }

    public addEventListener (
        type: string,
        listener: any, // @todo EventListenerOrEventListenerObject | null = null,
        options?: boolean | AddEventListenerOptions
    ): void {
        let eventListenersOfType = this._eventListeners.get(type);

        if (eventListenersOfType === undefined) {
            eventListenersOfType = new Set();

            this._eventListeners.set(type, eventListenersOfType);
        }

        if (typeof listener === 'function') {
            eventListenersOfType.add(listener);
        }

        // @todo Fully implement the addEventListener() method.
        options; // tslint:disable-line:no-unused-expression
    }

    public dispatchEvent (evt: Event): boolean {
        const eventListenersOfType = this._eventListeners.get(evt.type);

        if (eventListenersOfType !== undefined) {
            eventListenersOfType.forEach((listener) => listener(evt));

            return true;
        }

        // @todo Fully implement the dispatchEvent() method.

        return false;
    }

    public removeEventListener (
        type: string,
        listener: any, // @todo EventListenerOrEventListenerObject | null = null,
        options?: EventListenerOptions | boolean
    ): void {
        const eventListenersOfType = this._eventListeners.get(type);

        if (eventListenersOfType !== undefined && typeof listener === 'function') {
            eventListenersOfType.delete(listener);
        }

        // @todo Fully implement the removeEventListener() method.
        options; // tslint:disable-line:no-unused-expression
    }

}

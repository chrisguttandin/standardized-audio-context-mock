class Registrar {

    constructor () {
        this._nodes = new WeakMap();
    }

    add (context, type, node) {
        var nodesOfContext,
            nodesOfType;

        if (this._nodes.has(context)) {
            nodesOfContext = this._nodes.get(context);
        } else {
            nodesOfContext = new Map();
            this._nodes.set(context, nodesOfContext);
        }

        if (nodesOfContext.has(type)) {
            nodesOfType = nodesOfContext.get(type);
        } else {
            nodesOfType = new Set();
            nodesOfContext.set(type, nodesOfType);
        }

        nodesOfType.add(node);
    }

    get (context, type) {
        if (this._nodes.has(context)) {
            let nodesOfContext = this._nodes.get(context);

            if (nodesOfContext.has(type)) {
                return [ ...nodesOfContext.get(type) ];
            }
        }

        return [];
    }

    reset (context) {
        if (this._nodes.has(context)) {
            this._nodes.delete(context);
        }
    }

}

export const registrar = new Registrar();

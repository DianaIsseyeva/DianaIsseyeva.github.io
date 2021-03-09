class Observer {
    constructor() {
        this.listeners = {};
    }
    on(type, listener) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(listener);
    }
    off(type, listener) {
        if (type in this.listeners) {
            for (let i = 0; i < this.listeners[type].length; i++) {
                if (this.listeners[type][i] === listener) {
                    this.listeners[type].splice(i, 1);
                }
            }
        }
    }
    trigger(type, args) {
        if (type in this.listeners) {
            for (let i = 0; i < this.listeners[type].length; i++) {
                const listener = this.listeners[type][i];
                listener(args);
            }
        }
    }
}
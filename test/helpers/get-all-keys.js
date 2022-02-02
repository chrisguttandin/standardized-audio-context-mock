export const getAllKeys = (object) => {
    const keys = [];

    let prototype = object;

    while (prototype !== undefined && prototype !== Object.prototype) {
        keys.push(...Object.getOwnPropertyNames(prototype).filter((key) => !key.startsWith('_')));

        prototype = Object.getPrototypeOf(prototype);
    }

    return keys;
};

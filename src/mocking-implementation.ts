export const NO_MOCKING = Symbol('NO_MOCKING');

const DEFAULT_MOCKING_IMPLEMENTATION = (_: (...args: any[]) => any): any => NO_MOCKING;

let mockingImplementation = DEFAULT_MOCKING_IMPLEMENTATION;

export const getMockingImplementation = () => mockingImplementation;

export const createMockableFunction = <T extends (...args: any[]) => any>(defaultImplementation: T): T => {
    let mockingImplementationInUse = getMockingImplementation();
    let mock = mockingImplementationInUse(defaultImplementation);

    return new Proxy(defaultImplementation, {
        apply: (_, thisArgumemt, args) => {
            const currentMockingImplementation = getMockingImplementation();

            if (currentMockingImplementation !== mockingImplementationInUse) {
                mockingImplementationInUse = currentMockingImplementation;
                mock = mockingImplementationInUse(defaultImplementation);
            }

            return Reflect.apply(mock === NO_MOCKING ? defaultImplementation : mock, thisArgumemt, args);
        },
        get: (_, prop) => {
            const currentMockingImplementation = getMockingImplementation();

            if (currentMockingImplementation !== mockingImplementationInUse) {
                mockingImplementationInUse = currentMockingImplementation;
                mock = mockingImplementationInUse(defaultImplementation);
            }

            return Reflect.get(mock === NO_MOCKING ? defaultImplementation : mock, prop);
        },
        set: (_, prop, value) => {
            const currentMockingImplementation = getMockingImplementation();

            if (currentMockingImplementation !== mockingImplementationInUse) {
                mockingImplementationInUse = currentMockingImplementation;
                mock = mockingImplementationInUse(defaultImplementation);
            }

            return Reflect.set(mock === NO_MOCKING ? defaultImplementation : mock, prop, value);
        }
    });
};

export const resetMockingImplementation = () => (mockingImplementation = DEFAULT_MOCKING_IMPLEMENTATION);

export const setMockingImplementation = (newMockingImplementation: (defaultImplementation: (...args: any[]) => any) => any) =>
    (mockingImplementation = newMockingImplementation);

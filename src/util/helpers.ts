export function inputValueToBoolean(value: boolean | string): boolean {
    return value === '' || (value && value !== 'false');
}

export function isUndefined(value) {
    return value === undefined;
}

export function isNull(value) {
    return value === null;
}

export function isUndefinedOrNull(value) {
    return isUndefined(value) || isNull(value);
}

function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    const type = typeof value;
    return !!value && (type === 'object' || type === 'function');
}

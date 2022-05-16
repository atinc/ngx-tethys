export function isNotNil<T>(value: T): value is NonNullable<T> {
    return typeof value !== 'undefined' && value !== null;
}

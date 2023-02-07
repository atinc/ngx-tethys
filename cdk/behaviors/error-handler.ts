export type DefaultErrorHandler = (error: Error) => void;

let _defaultErrorHandler: DefaultErrorHandler = (error: Error) => {};

export function setDefaultErrorHandler(defaultErrorHandler: DefaultErrorHandler) {
    _defaultErrorHandler = defaultErrorHandler;
}

export function getDefaultErrorHandler() {
    return _defaultErrorHandler;
}

import { isFunction } from '@tethys/cdk/is';
import { getDefaultErrorHandler } from './error-handler';
import { ErrorFn, SuccessFn } from './types';

const BEHAVIOR = Symbol('BEHAVIOR');

export type Behavior<P extends Array<any>, R> = (...args: P) => R & {
    [BEHAVIOR]: true;
};

export interface BehaviorContext<R> {
    success?: SuccessFn<R>;
    error?: ErrorFn;
}

export function createBehaviorFromFunction<P extends any[], R>(fn: () => R): Behavior<P, R>;
export function createBehaviorFromFunction<P extends any[], R, U extends Record<string, unknown>>(
    fn: () => R,
    extraApi: U
): Behavior<P, R> & U;
export function createBehaviorFromFunction<P extends any[], R, U extends Record<string, unknown> = {}>(
    fn: () => R,
    extraApi: U = {} as U
): Behavior<P, R> & U {
    (fn as any)[BEHAVIOR] = true;
    Object.keys(extraApi).forEach(key => {
        const value = extraApi[key];
        Object.assign(fn, { [key]: value });
    });
    return fn as Behavior<P, R> & U;
}

export function pickBehaviorCallbacks<R>(
    beforeContext: BehaviorContext<R>,
    successOrContext: SuccessFn<R> | BehaviorContext<R>,
    error?: ErrorFn
) {
    let successFn: SuccessFn<R> | undefined;
    let errorFn: ErrorFn | undefined;
    if (successOrContext) {
        if (isFunction(successOrContext)) {
            successFn = successOrContext;
            errorFn = error;
        } else {
            successFn = successOrContext.success;
            errorFn = successOrContext.error;
        }
    } else {
        errorFn = error;
    }
    return {
        success: successFn || beforeContext?.success,
        error: errorFn || beforeContext?.error
    };
}

export function handleBehaviorError(error: Error, errorFn?: ErrorFn) {
    if (errorFn) {
        errorFn(error);
    } else {
        const defaultErrorHandler = getDefaultErrorHandler();
        defaultErrorHandler && defaultErrorHandler(error);
    }
}

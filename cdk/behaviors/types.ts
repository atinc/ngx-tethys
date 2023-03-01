import { Observable } from 'rxjs';

const BEHAVIOR = Symbol('BEHAVIOR');

export type ExtractObservableValue<T> = T extends Observable<infer V> ? V : T;

export { BEHAVIOR };

export type Behavior<P extends Array<any>, R> = (
    ...args: P
) => R & {
    [BEHAVIOR]: true;
};

export interface BehaviorContext<R> {
    success?: SuccessFn<R>;
    error?: ErrorFn;
}

export type ParametersWithAppend<Fn extends (...args: any[]) => any, NextArg> = Fn extends (...args: infer PrevArg) => any
    ? [...PrevArg, NextArg]
    : never;

export type SuccessFn<R> = (result: R) => void;
export type ErrorFn = (error: Error) => void;

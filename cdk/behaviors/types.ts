import { Observable } from 'rxjs';

export type ExtractObservableValue<T> = T extends Observable<infer V> ? V : T;

export type ParametersWithAppend<Fn extends (...args: any[]) => any, NextArg> = Fn extends (...args: infer PrevArg) => any
    ? [...PrevArg, NextArg]
    : never;

export type SuccessFn<R> = (result: R) => void;
export type ErrorFn = (error: Error) => void;

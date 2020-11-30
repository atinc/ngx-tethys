import { SafeAny } from './common';

export declare interface Dictionary<T> {
    [key: string]: T;
}

export declare interface NumericDictionary<T> {
    [index: number]: T;
}

export declare interface IndexableObject {
    [key: string]: SafeAny;
}

export const System = (window as any).System;
export const ENV = (window as any).ENV;
export const PR = (window as any).PR;
export const mermaid = (window as any).mermaid;
export const liteMarked = (window as any).liteMarked;
export const $ = (window as any).$;
export const katex = (window as any).katex;
export declare interface Dictionary<T> {
    [key: string]: T;
}

export declare interface NumericDictionary<T> {
    [index: number]: T;
}

export interface Id {
    toString(): string;
}

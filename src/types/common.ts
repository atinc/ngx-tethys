export const System = (window as any).System;
export const ENV = (window as any).ENV;
export const PR = (window as any).PR;
export const mermaid = (window as any).mermaid;
export const liteMarked = (window as any).liteMarked;
export const $ = (window as any).$;
export const katex = (window as any).katex;

export declare module jasmine {
    interface Matchers<T> {
        toHaveCssClass(expected: any): boolean;
    }
}

export declare interface Id {
    toString(): string;
}

export type SafeAny = any;

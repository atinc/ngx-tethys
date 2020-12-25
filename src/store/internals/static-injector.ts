import { Injector } from '@angular/core';

class ThyStoreModuleIsNotImported extends Error {
    constructor() {
        super(`You've forgotten to import "ThyStoreModule"!`);
    }
}

let injector: Injector | null = null;

function assertDefined<T>(actual: T | null | undefined): asserts actual is T {
    if (actual == null) {
        throw new ThyStoreModuleIsNotImported();
    }
}

export function setInjector(parentInjector: Injector): void {
    injector = parentInjector;
}

/**
 * Ensure that we don't keep any references in case of the bootstrapped
 * module is destroyed via `NgModuleRef.destroy()`.
 */
export function clearInjector(): void {
    injector = null;
}

export function getInjector(): Injector {
    assertDefined(injector);
    return injector;
}

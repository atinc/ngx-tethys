import { OnInit } from '@angular/core';
import { Constructor } from './constructor';

export interface ThyInitialized extends OnInit {
    initialized: boolean;
}

export function mixinInitialized<T extends Constructor<{}>>(base: T): Constructor<ThyInitialized> & T {
    return class Mixin extends base {
        initialized = false;

        constructor(...args: any[]) {
            super(...args);
        }

        ngOnInit(): void {
            this.initialized = true;
        }
    };
}

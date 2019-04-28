import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Constructor } from './constructor';

export interface ThyLoadingDone {
    loadingDone: boolean;
}

export function mixinLoadingDone<T extends Constructor<{}>>(base: T): Constructor<ThyLoadingDone> & T {
    return class Mixin extends base {
        loadingDone = false;

        setLoadingDone(value: boolean) {
            this.loadingDone = value;
        }

        constructor(...args: any[]) {
            super(...args);
        }
    };
}

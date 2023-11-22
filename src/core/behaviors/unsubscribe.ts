import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Constructor } from './constructor';

export interface ThyUnsubscribe extends OnDestroy {
    ngUnsubscribe$: Subject<void>;
}

/**
 * Mixin to augment a directive with a `disableRipple` property.
 * @deprecated please use `takeUntilDestroyed`
 */
export function mixinUnsubscribe<T extends Constructor<{}>>(base: T): Constructor<ThyUnsubscribe> & T {
    return class Mixin extends base {
        ngUnsubscribe$ = new Subject<void>();

        constructor(...args: any[]) {
            super(...args);
        }

        ngUnsubscribeReinitialize() {
            this.ngUnsubscribe$.next();
            this.ngUnsubscribe$.complete();
            this.ngUnsubscribe$ = new Subject();
        }

        ngOnDestroy() {
            this.ngUnsubscribe$.next();
            this.ngUnsubscribe$.complete();
        }
    };
}

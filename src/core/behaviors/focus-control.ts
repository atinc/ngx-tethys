import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { ElementRef, inject } from '@angular/core';
import { SafeAny } from 'ngx-tethys/types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class HostFocusControl {
    private ngUnsubscribe$ = new Subject<void>();

    private monitorElement: HTMLElement | ElementRef<HTMLElement>;

    elementRef = inject(ElementRef);

    focusMonitor = inject(FocusMonitor);

    focusChanged: (origin: FocusOrigin) => void = () => {};

    constructor(checkChildren: boolean = true, element?: HTMLElement | ElementRef<HTMLElement>) {
        this.monitorElement = element || this.elementRef.nativeElement;

        this.focusMonitor
            .monitor(this.monitorElement as SafeAny, checkChildren)
            .pipe(takeUntil(this.ngUnsubscribe$))
            .subscribe((origin: FocusOrigin) => {
                this.focusChanged(origin);
            });
    }

    focusVia(element: HTMLElement | ElementRef<HTMLElement>, origin: FocusOrigin, options?: FocusOptions): void {
        this.focusMonitor.focusVia(element as SafeAny, origin, options);
    }

    destroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
        this.focusMonitor.stopMonitoring(this.monitorElement as SafeAny);
    }
}

export function useHostFocusControl(checkChildren?: boolean, element?: HTMLElement | ElementRef<HTMLElement>): HostFocusControl {
    return new HostFocusControl(checkChildren, element);
}

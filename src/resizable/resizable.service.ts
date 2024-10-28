import { DOCUMENT } from '@angular/common';
import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { isTouchEvent } from 'ngx-tethys/util';
import { Subject } from 'rxjs';
import { ThyResizeHandleMouseDownEvent } from './resize-handle.component';

/**
 * @internal
 */
@Injectable()
export class ThyResizableService implements OnDestroy {
    private ngZone = inject(NgZone);

    private document: Document;
    private listeners = new Map<string, (event: MouseEvent | TouchEvent) => void>();

    /**
     * The `OutsideAngular` prefix means that the subject will emit events outside of the Angular zone,
     * so that becomes a bit more descriptive for those who'll maintain the code in the future:
     * ```ts
     * thyResizableService.handleMouseDownOutsideAngular$.subscribe(event => {
     *   console.log(Zone.current); // <root>
     *   console.log(NgZone.isInAngularZone()); // false
     * });
     * ```
     */

    handleMouseDownOutsideAngular$ = new Subject<ThyResizeHandleMouseDownEvent>();
    documentMouseUpOutsideAngular$ = new Subject<MouseEvent | TouchEvent>();
    documentMouseMoveOutsideAngular$ = new Subject<MouseEvent | TouchEvent>();
    mouseEnteredOutsideAngular$ = new Subject<boolean>();

    constructor() {
        const document = inject(DOCUMENT);

        this.document = document;
    }

    startResizing(event: MouseEvent | TouchEvent): void {
        const _isTouchEvent = isTouchEvent(event);
        this.clearListeners();
        const moveEvent = _isTouchEvent ? 'touchmove' : 'mousemove';
        const upEvent = _isTouchEvent ? 'touchend' : 'mouseup';
        const moveEventHandler = (e: MouseEvent | TouchEvent) => {
            this.documentMouseMoveOutsideAngular$.next(e);
        };
        const upEventHandler = (e: MouseEvent | TouchEvent) => {
            this.documentMouseUpOutsideAngular$.next(e);
            this.clearListeners();
        };

        this.listeners.set(moveEvent, moveEventHandler);
        this.listeners.set(upEvent, upEventHandler);
        this.ngZone.runOutsideAngular(() => {
            this.listeners.forEach((handler, name) => {
                this.document.addEventListener(name, handler as EventListener);
            });
        });
    }

    private clearListeners(): void {
        this.listeners.forEach((handler, name) => {
            this.document.removeEventListener(name, handler as EventListener);
        });
        this.listeners.clear();
    }

    ngOnDestroy(): void {
        this.handleMouseDownOutsideAngular$.complete();
        this.documentMouseUpOutsideAngular$.complete();
        this.documentMouseMoveOutsideAngular$.complete();
        this.mouseEnteredOutsideAngular$.complete();
        this.clearListeners();
    }
}

import { Injectable, NgZone, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ThyDistanceVector } from './typings';

/**
 * @internal
 */
@Injectable({
    providedIn: 'root'
})
export class ThyCarouselService {
    private ngZone = inject(NgZone);

    private listeners = new Map<string, (event: MouseEvent | TouchEvent) => void>();
    private document: Document;

    documentDraggingOutside$ = new Subject<MouseEvent | Touch>();

    constructor() {
        const document = inject(DOCUMENT);

        this.document = document;
    }

    private clearListeners(): void {
        this.listeners.forEach((handler, name) => {
            this.document.removeEventListener(name, handler as EventListener);
        });
        this.listeners.clear();
    }

    private getEventPotions(event: MouseEvent | TouchEvent): MouseEvent | Touch {
        if (event instanceof MouseEvent) {
            return event;
        } else {
            return event.touches[0] || event.changedTouches[0];
        }
    }

    registerDrag(event: MouseEvent | TouchEvent): Observable<ThyDistanceVector> {
        if (this.documentDraggingOutside$) {
            this.documentDraggingOutside$.complete();
        }

        const startPoint = this.getEventPotions(event);

        this.documentDraggingOutside$ = new Subject<MouseEvent | Touch>();

        this.registerHandler(event);

        return this.documentDraggingOutside$.pipe(
            map(e => {
                return {
                    x: e.pageX - startPoint!.pageX,
                    y: e.pageY - startPoint!.pageY
                };
            })
        );
    }

    registerHandler(event: MouseEvent | TouchEvent) {
        this.clearListeners();
        const _isTouchEvent = event instanceof MouseEvent;
        const moveEvent = _isTouchEvent ? 'mousemove' : 'touchmove';
        const upEvent = _isTouchEvent ? 'mouseup' : 'touchend';
        const moveEventHandler = (e: MouseEvent | TouchEvent) => {
            this.documentDraggingOutside$.next(e instanceof MouseEvent ? e : e.touches[0] || e.changedTouches[0]);
        };
        const upEventHandler = () => {
            this.documentDraggingOutside$.complete();
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
}

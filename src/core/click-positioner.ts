import { Injectable, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export interface ThyClickPosition {
    x: number;
    y: number;
}

@Injectable({
    providedIn: 'root'
})
export class ThyClickPositioner {
    private lastPosition: ThyClickPosition = null;

    private initialized = false;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private ngZone: NgZone
    ) {
        this.initialize();
    }

    get lastClickPosition(): ThyClickPosition | null {
        return this.lastPosition;
    }

    runTask(task: (position?: ThyClickPosition) => void) {
        setTimeout(() => {
            task(this.lastClickPosition);
        });
    }

    initialize(): void {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.ngZone.runOutsideAngular(() => {
            this.document.addEventListener('click', (event: MouseEvent) => {
                this.lastPosition = { x: event.clientX, y: event.clientY };
            });
        });
    }
}

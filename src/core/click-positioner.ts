import { Injectable, Inject, NgZone } from '@angular/core';
import { ThyClickDispatcher } from './event-dispatchers';

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

    constructor(private clickDispatcher: ThyClickDispatcher) {}

    get lastClickPosition(): ThyClickPosition | null {
        return this.lastPosition;
    }

    runTaskUseLastPosition(task: (position?: ThyClickPosition) => void) {
        setTimeout(() => {
            task(this.lastClickPosition);
        });
    }

    initialize(): void {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        this.clickDispatcher.clicked(0).subscribe((event: MouseEvent) => {
            this.lastPosition = { x: event.clientX, y: event.clientY };
        });
    }
}

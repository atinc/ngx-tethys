import { Injectable, Inject, NgZone } from '@angular/core';
import { ClickDispatcher } from './click-dispatcher';

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

    constructor(private clickDispatcher: ClickDispatcher) {}

    get lastClickPosition(): ThyClickPosition | null {
        return this.lastPosition;
    }

    runTaskUsePosition(task: (position?: ThyClickPosition) => void) {
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

import { Injectable, NgZone, inject } from '@angular/core';
import { ThyClickDispatcher } from './event-dispatchers/index';

export interface ThyClickPosition {
    x: number;
    y: number;
}

@Injectable({
    providedIn: 'root'
})
export class ThyClickPositioner {
    private clickDispatcher = inject(ThyClickDispatcher);

    private lastPosition: ThyClickPosition | undefined = undefined;

    private initialized = false;

    get lastClickPosition(): ThyClickPosition | undefined {
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
        this.clickDispatcher.clicked<MouseEvent>(0).subscribe((event: MouseEvent) => {
            this.lastPosition = { x: event.clientX, y: event.clientY };
        });
    }
}

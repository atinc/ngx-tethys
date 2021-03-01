import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThyResizeDirection } from './interface';

export const DEFAULT_RESIZE_DIRECTION: ThyResizeDirection[] = [
    'bottomRight',
    'topRight',
    'bottomLeft',
    'topLeft',
    'bottom',
    'right',
    'top',
    'left'
];

@Component({
    selector: 'thy-resize-handles',
    exportAs: 'thyResizeHandles',
    template: `
        <thy-resize-handle *ngFor="let dir of directions" [thyDirection]="dir"></thy-resize-handle>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyResizeHandlesComponent implements OnChanges {
    @Input() thyDirections: ThyResizeDirection[] = DEFAULT_RESIZE_DIRECTION;
    directions: Set<ThyResizeDirection>;

    constructor() {
        this.directions = new Set(this.thyDirections);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyDirections) {
            this.directions = new Set(changes.thyDirections.currentValue);
        }
    }
}

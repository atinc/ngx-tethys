import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, booleanAttribute } from '@angular/core';
import { ThyResizeDirection } from './interface';
import { ThyResizeHandle } from './resize-handle.component';
import { NgFor } from '@angular/common';

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

/**
 * 定义调整手柄的快捷组件
 * @name thy-resize-handles
 */
@Component({
    selector: 'thy-resize-handles',
    exportAs: 'thyResizeHandles',
    template: ` <thy-resize-handle *ngFor="let dir of directions" [thyLine]="thyLine" [thyDirection]="dir"></thy-resize-handle> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, ThyResizeHandle]
})
export class ThyResizeHandles implements OnChanges {
    /**
     * 定义调整手柄的方向
     * @type ThyResizeDirection[]
     */
    @Input() thyDirections: ThyResizeDirection[] = DEFAULT_RESIZE_DIRECTION;

    /**
     * 是否展示拖拽线
     */
    @Input({ transform: booleanAttribute }) thyLine = false;

    directions = new Set<ThyResizeDirection>(this.thyDirections);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyDirections) {
            this.directions = new Set(changes.thyDirections.currentValue);
        }
    }
}

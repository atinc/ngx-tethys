import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThyResizeDirection } from './interface';
import { ThyResizeHandle } from './resize-handle.component';

import { coerceBooleanProperty } from 'ngx-tethys/util';

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
    template: `
        @for (dir of directions; track $index) {
            <thy-resize-handle [thyLine]="thyLine" [thyDirection]="dir"></thy-resize-handle>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ThyResizeHandle]
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
    @Input({ transform: coerceBooleanProperty }) thyLine = false;

    directions = new Set<ThyResizeDirection>(this.thyDirections);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyDirections) {
            this.directions = new Set(changes.thyDirections.currentValue);
        }
    }
}

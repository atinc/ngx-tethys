import { Directive, ElementRef, Input, Optional } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 自定义可拖拽区域内容
 * @name thy-drag-handle,[thyDragHandle]
 * @order 20
 */
@Directive({
    selector: 'thy-drag-handle,[thyDragHandle]',
    standalone: true
})
export class ThyDragHandleDirective {
    private _disabled = false;

    /**
     * 是否禁用
     * @default false
     */
    @Input({ alias: 'thyDisabled', transform: coerceBooleanProperty })
    set disabled(value: boolean) {
        this._disabled = value;
    }
    get disabled(): boolean {
        return this._disabled;
    }

    constructor(
        public element: ElementRef<HTMLElement>,
        @Optional() drag: ThyDragDirective
    ) {
        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}

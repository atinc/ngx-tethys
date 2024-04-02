import { Directive, ElementRef, Input, Optional, booleanAttribute } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThyDragDirective } from './drag.directive';

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
    @Input({ alias: 'thyDisabled', transform: booleanAttribute })
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    constructor(public element: ElementRef<HTMLElement>, @Optional() drag: ThyDragDirective) {
        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}

import { Directive, ElementRef, Input, Optional } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ThyDragDirective } from './drag.directive';
import { InputBoolean } from 'ngx-tethys/core';

/**
 * 自定义可拖拽区域内容
 * @name thy-drag-handle,[thyDragHandle]
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
    @Input('thyDisabled')
    @InputBoolean()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    constructor(public element: ElementRef<HTMLElement>, @Optional() drag: ThyDragDirective) {
        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}

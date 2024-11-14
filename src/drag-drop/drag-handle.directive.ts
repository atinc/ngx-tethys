import { Directive, ElementRef, Input, inject } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 自定义可拖拽区域内容
 * @name thy-drag-handle,[thyDragHandle]
 * @order 20
 * @deprecated please use @angular/cdk/drag-drop
 */
@Directive({
    selector: 'thy-drag-handle,[thyDragHandle]',
    standalone: true
})
export class ThyDragHandleDirective {
    element = inject<ElementRef<HTMLElement>>(ElementRef);

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

    constructor() {
        const drag = inject(ThyDragDirective, { optional: true })!;

        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}

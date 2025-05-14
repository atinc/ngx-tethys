import { Directive, ElementRef, inject, input } from '@angular/core';
import { ThyDragDirective } from './drag.directive';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { IThyDragHandleDirective } from './drag-drop.token';

/**
 * 自定义可拖拽区域内容
 * @name thy-drag-handle,[thyDragHandle]
 * @order 20
 * @deprecated please use @angular/cdk/drag-drop
 */
@Directive({
    selector: 'thy-drag-handle,[thyDragHandle]'
})
export class ThyDragHandleDirective implements IThyDragHandleDirective {
    element = inject<ElementRef<HTMLElement>>(ElementRef);

    /**
     * 是否禁用
     * @default false
     * @type boolean
     */
    disabled = input(false, { alias: 'thyDisabled', transform: coerceBooleanProperty });

    constructor() {
        const drag = inject(ThyDragDirective, { optional: true })!;

        if (drag) {
            drag.dragRef.withHandles(this);
        }
    }
}

import { Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { ThyDragDirective } from './drag.directive';

/**
 * 自定义拖拽时可经过，拖拽结束时可放置的区域内容
 * @name thy-drag-content,[thyDragContent]
 * @order 25
 */
@Directive({
    selector: 'thy-drag-content,[thyDragContent]',
    standalone: true
})
export class ThyDragContentDirective {
    element = inject<ElementRef<HTMLElement>>(ElementRef);

    @HostBinding('class.thy-drag-content') contentClass = true;

    constructor() {
        const drag = inject(ThyDragDirective, { optional: true })!;

        if (drag) {
            drag.dragRef.withContentElement(this.element);
        }
    }
}

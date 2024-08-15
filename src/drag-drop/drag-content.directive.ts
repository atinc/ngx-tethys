import { Directive, ElementRef, HostBinding, Optional } from '@angular/core';
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
    @HostBinding('class.thy-drag-content') contentClass = true;

    constructor(
        public element: ElementRef<HTMLElement>,
        @Optional() drag: ThyDragDirective
    ) {
        if (drag) {
            drag.dragRef.withContentElement(this.element);
        }
    }
}

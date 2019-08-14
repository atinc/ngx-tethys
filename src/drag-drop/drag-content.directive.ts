import { Directive, ElementRef, Input, HostBinding, Optional } from '@angular/core';
import { ThyDragDirective } from './drag.directive';

@Directive({
    selector: 'thy-drag-content,[thyDragContent]'
})
export class ThyDragContentDirective {
    @HostBinding('class.thy-drag-content') contentClass = true;

    constructor(public element: ElementRef<HTMLElement>, @Optional() drag: ThyDragDirective) {
        if (drag) {
            drag.dragRef.withContentElement(this.element);
        }
    }
}

import { Directive, ElementRef, inject } from '@angular/core';

/**
 * @name thyDrawerContainer
 * @order 60
 */
@Directive({
    selector: '[thyDrawerContainer]'
})
export class ThyDrawerContainerDirective {
    elementRef = inject(ElementRef);
}

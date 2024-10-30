import { Directive, ElementRef, inject } from '@angular/core';

/**
 * @name thyDrawerContainer
 * @order 60
 */
@Directive({
    selector: '[thyDrawerContainer]',
    standalone: true
})
export class ThyDrawerContainerDirective {
    elementRef = inject(ElementRef);
}

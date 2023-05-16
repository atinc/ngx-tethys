import { Directive, ElementRef } from '@angular/core';

/**
 * @name thyDrawerContainer
 * @order 60
 */
@Directive({
    selector: '[thyDrawerContainer]',
    standalone: true
})
export class ThyDrawerContainerDirective {
    constructor(public elementRef: ElementRef) {}
}

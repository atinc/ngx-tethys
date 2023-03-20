import { Directive, ElementRef } from '@angular/core';

/**
 * @name thyDrawerContainer
 */
@Directive({
    selector: '[thyDrawerContainer]',
    standalone: true
})
export class ThyDrawerContainerDirective {
    constructor(public elementRef: ElementRef) {}
}

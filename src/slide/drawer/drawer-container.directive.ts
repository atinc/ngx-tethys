import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[thyDrawerContainer]' })
export class ThyDrawerContainerDirective {
    constructor(public elementRef: ElementRef) {}
}

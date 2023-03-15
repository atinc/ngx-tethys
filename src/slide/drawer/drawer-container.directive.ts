import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[thyDrawerContainer]',
    standalone: true
})
export class ThyDrawerContainerDirective {
    constructor(public elementRef: ElementRef) {}
}

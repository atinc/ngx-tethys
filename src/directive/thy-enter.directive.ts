import { Directive, Output, HostListener, ElementRef, EventEmitter } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

/**
 * 将来会移动到 thy 组件库中
 */
@Directive({
    selector: '[thyEnter]'
})
export class ThyEnterDirective {

    @Output() thyEnter = new EventEmitter();

    @HostListener('keydown.enter', ['$event'])
    onKeydown(event: any) {
        event.preventDefault();
        this.thyEnter.emit(event);
    }

    constructor(private elementRef: ElementRef) { }

}

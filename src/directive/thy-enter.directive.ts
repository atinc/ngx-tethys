import { Directive, Output, HostListener, EventEmitter } from '@angular/core';
import { keycodes } from '../util';

/**
 * 与 (keydown.enter) 区别是支持组合键，当按 Ctrl + Enter 或者 Command + Enter 也会触发
 */
@Directive({
    selector: '[thyEnter]'
})
export class ThyEnterDirective {

    @Output() thyEnter = new EventEmitter();

    @HostListener('keydown', ['$event'])
    onKeydown(event: KeyboardEvent) {
        const keyCode = event.which || event.keyCode;
        if (keyCode === keycodes.ENTER) {
            event.preventDefault();
            this.thyEnter.emit(event);
        }
    }

    constructor() { }

}

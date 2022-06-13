import { Directive, Input, ElementRef, NgZone } from '@angular/core';
import { reqAnimFrame } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

@Directive({
    selector: 'input[thyAutofocus],textarea[thyAutofocus]'
})
export class ThyAutofocusDirective {
    // 自动选择，用于只读的 input 输入框，方便复制粘贴
    private _autoSelect = false;

    @Input()
    set thyAutoSelect(value: boolean) {
        this._autoSelect = coerceBooleanProperty(value);
    }

    // auto focus current element
    @Input()
    set thyAutofocus(value: boolean | string) {
        if (coerceBooleanProperty(value) !== false) {
            // Note: this is being run outside of the Angular zone because `element.focus()` doesn't require
            // running change detection.
            this.ngZone.runOutsideAngular(() =>
                // Note: `element.focus()` causes re-layout and this may lead to frame drop on slower devices.
                // https://gist.github.com/paulirish/5d52fb081b3570c81e3a#setting-focus
                // `setTimeout` is a macrotask and macrotasks are executed within the current rendering frame.
                // Animation tasks are executed within the next rendering frame.
                reqAnimFrame(() => {
                    this.elementRef.nativeElement.focus();
                    if (this._autoSelect && this.elementRef.nativeElement.select) {
                        this.elementRef.nativeElement.select();
                    }
                })
            );
        }
    }

    constructor(private elementRef: ElementRef, private ngZone: NgZone) {}
}

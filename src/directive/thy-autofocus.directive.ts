import { Directive, Input, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '../util/helpers';

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
            setTimeout(() => {
                this.elementRef.nativeElement.focus();
                if (this._autoSelect && this.elementRef.nativeElement.select) {
                    this.elementRef.nativeElement.select();
                }
            });
        }
    }

    constructor(private elementRef: ElementRef) {}
}

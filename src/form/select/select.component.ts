import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | '';

const noop = () => {
};

@Component({
    selector: 'thy-select',
    templateUrl: './select.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThySelectComponent),
            multi: true
        }
    ]
})
export class ThySelectComponent implements ControlValueAccessor {

    // The internal data model
    _innerValue: any = null;
    _disabled = false;
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    @HostBinding('class.thy-select') _isSelect = true;

    @Input() thySize: InputSize;

    writeValue(obj: any): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this._disabled = isDisabled;
    }

    constructor(
        private elementRef: ElementRef
    ) {
    }

    ngModelChange() {
        this.onChangeCallback(this._innerValue);
    }
}

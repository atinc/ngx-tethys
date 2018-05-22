import { Component, forwardRef, HostBinding, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ThyTranslate } from '../shared';
import { inputValueToBoolean } from '../util/helpers';

const noop = () => {
};

@Component({
    selector: '[thyCheckbox]',
    templateUrl: './checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxComponent),
            multi: true
        }
    ]
})
export class ThyCheckboxComponent implements ControlValueAccessor {

    // The internal data model
    _innerValue: boolean = null;

    _disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    _labelText: string;

    @HostBinding('class.form-check') _isFormCheck = true;

    @HostBinding('class.form-check-inline') _isFormCheckInline = false;

    @Input()
    set thyCheckboxInline(value: boolean) {
        this._isFormCheckInline = inputValueToBoolean(value);
    }

    @Input()
    set thyLabelText(value: string) {
        this._labelText = value;
    }

    @Input()
    set thyLabelTextTranslateKey(value: string) {
        if (value) {
            this._labelText = this.thyTranslate.instant(value);
        } else {
            this._labelText = '';
        }
    }

    writeValue(obj: boolean): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
            this.onChangeCallback(obj);
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
        private elementRef: ElementRef,
        private thyTranslate: ThyTranslate
    ) {
    }

    ngModelChange() {
        this.onChangeCallback(this._innerValue);
    }
}

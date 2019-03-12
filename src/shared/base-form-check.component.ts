import { ControlValueAccessor } from '@angular/forms';
import { HostBinding, Input, ChangeDetectorRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { ThyTranslate } from './translate';

const noop = () => {};

export class ThyFormCheckBaseComponent implements ControlValueAccessor {
    // The internal data model
    _innerValue: boolean = null;

    _disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    _labelText: string;

    @HostBinding('class.form-check') _isFormCheck = true;

    @HostBinding('class.form-check-inline') _isFormCheckInline = false;

    @HostBinding('class.form-check-checked') _isChecked = false;

    @Input()
    set thyInline(value: boolean) {
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

    @Input()
    set thyDisabled(value: boolean) {
        this.setDisabledState(inputValueToBoolean(value));
    }

    writeValue(obj: boolean): void {
        if (obj !== this._innerValue) {
            this._innerValue = obj;
            this._isChecked = !!this._innerValue;
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
        this.markForCheck();
    }

    updateValue(value: boolean): void {
        this._innerValue = value;
        this._isChecked = !!this._innerValue;
        this.onChangeCallback(value);
        this.markForCheck();
    }

    constructor(protected thyTranslate: ThyTranslate, protected changeDetectorRef?: ChangeDetectorRef) {}

    change() {
        this.updateValue(!this._innerValue);
    }

    markForCheck() {
        if (this.changeDetectorRef) {
            this.changeDetectorRef.markForCheck();
        }
    }
}

import { ControlValueAccessor } from '@angular/forms';
import { HostBinding, Input, ChangeDetectorRef, Directive, inject } from '@angular/core';
import { ThyTranslate, TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const noop = () => {};

/**
 * @private
 */
@Directive()
export class ThyFormCheckBaseComponent extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    protected thyTranslate = inject(ThyTranslate);
    protected changeDetectorRef? = inject(ChangeDetectorRef);

    // The internal data model
    _innerValue: boolean = null;

    _disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    _labelText: string;

    @HostBinding('class.form-check') _isFormCheck = true;

    @HostBinding('class.form-check-inline') _isFormCheckInline = false;

    @HostBinding('class.form-check-checked') _isChecked = false;

    @HostBinding('class.form-check-inline-no-label-text') get _isNoText() {
        return this._isFormCheckInline && !this._labelText;
    }

    /**
     * 是否同一行展示
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyInline(value: boolean) {
        this._isFormCheckInline = value;
    }

    /**
     * Label 展示文本
     */
    @Input()
    set thyLabelText(value: string) {
        this._labelText = value;
    }

    /**
     * Label 文本多语言 key
     * @deprecated
     */
    @Input()
    set thyLabelTextTranslateKey(value: string) {
        if (value) {
            this._labelText = this.thyTranslate.instant(value);
        } else {
            this._labelText = '';
        }
    }

    disabled = false;

    /**
     * 是否禁用
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
        this.setDisabledState(this.disabled);
    }

    override get thyDisabled() {
        return this.disabled;
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

    constructor() {
        super();
    }

    change() {
        this.updateValue(!this._innerValue);
    }

    markForCheck() {
        if (this.changeDetectorRef) {
            this.changeDetectorRef.markForCheck();
        }
    }
}

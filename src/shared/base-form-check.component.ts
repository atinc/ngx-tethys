import { ControlValueAccessor } from '@angular/forms';
import { Input, ChangeDetectorRef, Directive, inject, input, computed } from '@angular/core';
import { ThyTranslate, TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

const noop = () => {};

/**
 * @private
 */
@Directive({
    host: {
        '[class.form-check]': '_isFormCheck',
        '[class.form-check-inline]': 'thyInline()',
        '[class.form-check-checked]': '_isChecked',
        '[class.form-check-inline-no-label-text]': '_isNoText()'
    }
})
export class ThyFormCheckBaseComponent extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    protected thyTranslate = inject(ThyTranslate);
    protected changeDetectorRef? = inject(ChangeDetectorRef);

    // The internal data model
    _innerValue: boolean = null;

    _disabled = false;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    _isFormCheck = true;

    _isChecked = false;

    /**
     * 是否同一行展示
     * @default false
     */
    readonly thyInline = input(false, { transform: coerceBooleanProperty });

    /**
     * Label 展示文本
     */
    readonly thyLabelText = input<string>();

    /**
     * Label 文本多语言 key
     */
    readonly thyLabelTextTranslateKey = input<string>();

    _labelText = computed(() => {
        const labelTextTranslateKey = this.thyLabelTextTranslateKey();
        const labelText = this.thyLabelText();
        return labelTextTranslateKey ? this.thyTranslate.instant(labelTextTranslateKey) : labelText || '';
    });

    _isNoText = computed(() => {
        return this.thyInline() && !this._labelText();
    });

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

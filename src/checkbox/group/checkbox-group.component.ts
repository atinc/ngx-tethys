import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * Checkbox Group 选项
 */
export interface ThyCheckboxOption {
    /**
     * 选项展示文案
     */
    label: string;
    /**
     * 选项值；选中后进入 Group 的 ngModel 数组
     */
    value: string | number | boolean;
    /**
     * 是否禁用该选项
     */
    disabled?: boolean;
}

export type ThyCheckboxGroupValue = Array<string | number | boolean>;

/**
 * 多选框组合
 * @name thy-checkbox-group
 * @order 20
 */
@Component({
    selector: 'thy-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCheckboxGroup),
            multi: true
        }
    ],
    host: {
        class: 'thy-checkbox-group',
        '[attr.tabindex]': '-1'
    },
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ThyCheckboxGroup implements ControlValueAccessor {
    /**
     * 选项列表
     */
    readonly thyOptions = input<ThyCheckboxOption[]>([]);

    /**
     * 是否同一行展示
     * @default false
     */
    readonly thyInline = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否禁用整组
     * @default false
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    private readonly innerValue = signal<ThyCheckboxGroupValue>([]);

    private readonly formDisabled = signal(false);

    private onChange: (value: ThyCheckboxGroupValue) => void = () => {};

    private onTouched: () => void = () => {};

    readonly isGroupDisabled = computed(() => this.thyDisabled() || this.formDisabled());

    isChecked(optionValue: string | number | boolean): boolean {
        return this.innerValue().includes(optionValue);
    }

    isOptionDisabled(option: ThyCheckboxOption): boolean {
        return this.isGroupDisabled() || !!option.disabled;
    }

    onCheckboxChange(option: ThyCheckboxOption, event: Event): void {
        if (this.isOptionDisabled(option)) {
            return;
        }
        const checked = (event.target as HTMLInputElement).checked;
        this.toggle(option.value, checked);
    }

    writeValue(value: ThyCheckboxGroupValue | null | undefined): void {
        this.innerValue.set(Array.isArray(value) ? [...value] : []);
    }

    registerOnChange(fn: (value: ThyCheckboxGroupValue) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.formDisabled.set(isDisabled);
    }

    private toggle(optionValue: string | number | boolean, checked: boolean): void {
        if (this.isGroupDisabled()) {
            return;
        }
        const current = this.innerValue();
        const next = checked
            ? current.includes(optionValue)
                ? current
                : [...current, optionValue]
            : current.filter(item => item !== optionValue);
        this.innerValue.set(next);
        this.onChange([...next]);
        this.onTouched();
    }
}

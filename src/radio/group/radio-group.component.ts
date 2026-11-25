import { ChangeDetectionStrategy, Component, computed, effect, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { IThyRadioComponent, IThyRadioGroupComponent, THY_RADIO_GROUP_COMPONENT } from '../radio.token';

const buttonGroupSizeMap: Record<string, string> = {
    sm: 'btn-group-sm',
    md: 'btn-group-md',
    lg: 'btn-group-lg'
};

const radioGroupInlineClass = 'radio-group-layout-flex';

let nextUniqueId = 0;

/**
 * Radio Group 选项
 */
export interface ThyRadioOption {
    /**
     * 选项展示文案
     */
    label: string;
    /**
     * 选项值；选中后作为 Group 的 ngModel 值，组内应唯一
     */
    value: string | number | boolean;
    /**
     * 是否禁用该选项
     */
    disabled?: boolean;
}

export type ThyRadioGroupValue = string | number | boolean;

/**
 * @name thy-radio-group
 * @order 20
 */
@Component({
    selector: 'thy-radio-group',
    templateUrl: './radio-group.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRadioGroup),
            multi: true
        },
        {
            provide: THY_RADIO_GROUP_COMPONENT,
            useExisting: ThyRadioGroup
        }
    ],
    host: {
        class: 'thy-radio-group',
        '[class.btn-group]': 'isButtonGroup()',
        '[class.btn-group-outline-default]': 'isButtonGroupOutline()',
        '[attr.tabindex]': `-1`
    },
    changeDetection: ChangeDetectionStrategy.Eager
})
export class ThyRadioGroup implements IThyRadioGroupComponent, ControlValueAccessor {
    isButtonGroup = signal(false);

    isButtonGroupOutline = signal(false);

    /**
     * 大小
     * @type sm | md | lg
     * @default md
     */
    readonly thySize = input<string>('md');

    /**
     * 是否同一行展示
     * @default false
     */
    readonly thyInline = input(false, { transform: coerceBooleanProperty });

    /**
     * 布局
     * @type flex
     * @deprecated please use thyInline, will be removed in v23
     */
    readonly thyLayout = input<string>();

    /**
     * 选项列表；非空时走 options 数据驱动（优先于 content 投影）
     */
    readonly thyOptions = input<ThyRadioOption[]>([]);

    /**
     * 是否禁用单选组合框
     * @default false
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    private readonly formDisabled = signal(false);

    private readonly innerValue = signal<ThyRadioGroupValue | null>(null);

    private readonly radios = signal<IThyRadioComponent[]>([]);

    private hostRenderer = useHostRenderer();

    private onChange: (value: ThyRadioGroupValue) => void = () => {};

    private onTouched: () => void = () => {};

    readonly hasOptions = computed(() => (this.thyOptions()?.length ?? 0) > 0);

    readonly isGroupDisabled = computed(() => this.thyDisabled() || this.formDisabled());

    readonly name = `thy-radio-group-${nextUniqueId++}`;

    isChecked(optionValue: ThyRadioGroupValue): boolean {
        return this.innerValue() === optionValue;
    }

    isOptionDisabled(option: ThyRadioOption): boolean {
        return this.isGroupDisabled() || !!option.disabled;
    }

    onRadioChange(option: ThyRadioOption): void {
        if (this.isOptionDisabled(option)) {
            return;
        }
        this.updateValue(option.value, true);
    }

    addRadio(radio: IThyRadioComponent): void {
        this.radios.update(list => (list.includes(radio) ? list : [...list, radio]));
    }

    removeRadio(radio: IThyRadioComponent): void {
        this.radios.update(list => list.filter(item => item !== radio));
    }

    updateValue(value: ThyRadioGroupValue, emit: boolean): void {
        this.innerValue.set(value);
        if (emit) {
            this.onChange(value);
            this.onTouched();
        }
    }

    writeValue(value: ThyRadioGroupValue | null | undefined): void {
        this.innerValue.set(value ?? null);
    }

    registerOnChange(fn: (value: ThyRadioGroupValue) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.formDisabled.set(isDisabled);
    }

    setGroup(): void {
        if (!this.isButtonGroup() && !this.isButtonGroupOutline()) {
            this.isButtonGroup.set(true);
            this.isButtonGroupOutline.set(true);
        }
    }

    constructor() {
        effect(() => {
            this.setClasses();
        });

        effect(() => {
            if (this.hasOptions()) {
                return;
            }
            const value = this.innerValue();
            this.radios().forEach(radio => {
                radio.thyChecked = radio.thyValue() === value;
            });
        });

        effect(() => {
            if (this.hasOptions()) {
                return;
            }
            const disabled = this.isGroupDisabled();
            this.radios().forEach(radio => {
                radio.setDisabledState?.(disabled);
            });
        });
    }

    private setClasses() {
        const classNames: string[] = [];
        const size = this.thySize();
        if (size && buttonGroupSizeMap[size]) {
            classNames.push(buttonGroupSizeMap[size]);
        }
        if (this.thyInline() || this.thyLayout() === 'flex') {
            classNames.push(radioGroupInlineClass);
        }
        this.hostRenderer.updateClass(classNames);
    }
}

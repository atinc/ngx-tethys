import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, helpers, ThyBooleanInput } from 'ngx-tethys/util';

import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    Input,
    numberAttribute,
    TemplateRef,
    inject,
    input,
    output,
    computed,
    model,
    ModelSignal,
    effect
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyStopPropagationDirective } from 'ngx-tethys/shared';
import { ThyTooltipDirective } from 'ngx-tethys/tooltip';
import { ThyRateItem } from './rate-item.component';

const noop = () => {};

/**
 * 评分组件
 * @name thy-rate
 * @order 10
 */
@Component({
    selector: 'thy-rate',
    templateUrl: './rate.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyRate),
            multi: true
        }
    ],
    host: {
        '[attr.tabindex]': `tabIndex`,
        class: 'thy-rate'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyStopPropagationDirective, ThyRateItem, NgClass, ThyTooltipDirective]
})
export class ThyRate extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    private cdr = inject(ChangeDetectorRef);

    readonly thyValue: ModelSignal<number> = model(0);

    readonly currentValue: ModelSignal<number> = model(0);

    readonly hasHalf: ModelSignal<boolean> = model(false);

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    /**
     * 自定义评分的总数
     */
    readonly thyCount = input(5, { transform: numberAttribute });

    /**
     * 是否只读
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    override set thyDisabled(value: boolean) {
        this.disabled = value;
    }
    override get thyDisabled(): boolean {
        return this.disabled;
    }

    disabled = false;

    /**
     * 是否允许半选
     * @default false
     */
    readonly thyAllowHalf = input<boolean, ThyBooleanInput>(false, { transform: coerceBooleanProperty });

    /**
     * 是否允许再次点击后清除
     */
    readonly thyAllowClear = input<boolean, ThyBooleanInput>(true, { transform: coerceBooleanProperty });

    /**
     * 自定义每项的提示信息
     * @type string[]
     */
    readonly thyTooltips = input<string[]>([]);

    /**
     * 自定义模板，目前支持传单个模板或图标名称、数组(模板 | 图标名称)
     * @type string | TemplateRef<any> | string[] | TemplateRef<any>[]
     */
    readonly thyIconTemplate = input<string | TemplateRef<any> | string[] | Array<TemplateRef<any>>>(null);

    /**
     * 当前值hover时的回调
     */
    readonly thyItemHoverChange = output<number>();

    readonly iconValue = computed(() => {
        const icons = this.thyIconTemplate();
        const currentValue = this.currentValue();
        if (!icons) {
            return null;
        } else {
            let iconValue = null;
            if (helpers.isArray(icons) && icons.length > 0) {
                const currentIcon = (currentValue && currentValue - 1) || 0;
                iconValue = icons[currentIcon];
            } else if (!helpers.isArray(icons)) {
                iconValue = icons;
            }
            if (iconValue instanceof TemplateRef) {
                return null;
            } else {
                return iconValue;
            }
        }
    });

    readonly iconTemplate = computed(() => {
        const icons = this.thyIconTemplate();
        const currentValue = this.currentValue();
        if (!icons) {
            return null;
        } else {
            let iconTemplate = null;
            if (helpers.isArray(icons) && icons.length > 0) {
                const currentIcon = (currentValue && currentValue - 1) || 0;
                iconTemplate = icons[currentIcon] as TemplateRef<any>;
            } else if (!helpers.isArray(icons)) {
                iconTemplate = icons;
            }
            if (iconTemplate instanceof TemplateRef) {
                return iconTemplate;
            } else {
                return null;
            }
        }
    });

    readonly rateArray = computed(() => {
        return this.updateRateArray();
    });

    readonly rateStyleArray = computed(() => {
        return this.updateItemStyle();
    });

    constructor() {
        super();
        effect(() => {
            this.hasHalf.set(!Number.isInteger(this.thyValue()));
            this.currentValue.set(Math.ceil(this.thyValue()));
        });
    }

    writeValue(value: number): void {
        this.thyValue.set(value || 0);
        this.cdr.markForCheck();
    }

    itemHover(isHalf: boolean, index: number): void {
        if (this.thyDisabled || (this.currentValue() === index + 1 && this.hasHalf() === isHalf)) {
            return;
        }
        this.currentValue.set(index + 1);
        this.hasHalf.set(isHalf);
        const _value = isHalf ? Number(this.currentValue() - 0.5) : this.currentValue();
        this.thyItemHoverChange.emit(_value);
    }

    itemClick(isHalf: boolean, index: number) {
        if (this.thyDisabled) {
            return;
        }
        this.currentValue.set(index + 1);
        const _value = isHalf ? index + 1 - 0.5 : index + 1;
        if (this.thyValue() === _value) {
            if (this.thyAllowClear()) {
                this.thyValue.set(0);
                this.onChangeCallback(this.thyValue());
                this.onTouchedCallback();
            }
        } else {
            this.thyValue.set(_value);
            this.onChangeCallback(this.thyValue());
            this.onTouchedCallback();
        }
    }

    onRateLeave(event: Event): void {
        event.stopPropagation();
        this.hasHalf.set(!Number.isInteger(this.thyValue()));
        this.currentValue.set(Math.ceil(this.thyValue()));
    }

    updateRateArray(): number[] {
        return this.thyCount() > 0
            ? Array(this.thyCount())
                  .fill(0)
                  .map((_, i) => {
                      return i;
                  })
            : [];
    }

    updateItemStyle(): Array<Record<string, boolean>> {
        const rateStyle = 'thy-rate-star';
        return this.rateArray().map(i => {
            const value = i + 1;
            return {
                [`${rateStyle}--full`]: value < this.currentValue() || (value === this.currentValue() && !this.hasHalf()),
                [`${rateStyle}--half`]: this.hasHalf() && value === this.currentValue(),
                [`${rateStyle}--active`]: this.hasHalf() && value === this.currentValue(),
                [`${rateStyle}--zero`]: value > this.currentValue()
            };
        });
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    trackByFn(index: number, item: any) {
        return item || index;
    }
}

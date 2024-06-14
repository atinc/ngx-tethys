import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, helpers } from 'ngx-tethys/util';

import { NgClass, NgFor } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    numberAttribute,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef
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
    standalone: true,
    imports: [NgFor, ThyStopPropagationDirective, ThyRateItem, NgClass, ThyTooltipDirective]
})
export class ThyRate extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor, OnInit, OnChanges {
    private _value = 0;

    private currentValue = 0;

    private hasHalf = false;

    public rateArray: number[] = [];

    public rateStyleArray: Record<string, boolean>[] = [];

    private icons: string | TemplateRef<any> | string[] | TemplateRef<any>[] = null;

    public iconValue: string = null;

    public iconTemplate: TemplateRef<any> = null;

    private onTouchedCallback: () => void = noop;

    private onChangeCallback: (_: any) => void = noop;

    /**
     * 自定义评分的总数
     */
    @Input({ transform: numberAttribute }) thyCount = 5;

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
    @Input({ transform: coerceBooleanProperty }) thyAllowHalf = false;

    /**
     * 是否允许再次点击后清除
     */
    @Input({ transform: coerceBooleanProperty }) thyAllowClear = true;

    /**
     * 自定义每项的提示信息
     * @type string[]
     */
    @Input() thyTooltips: string[] = [];

    /**
     * 自定义模板，目前支持传单个模板或图标名称、数组(模板 | 图标名称)
     * @type string | TemplateRef<any> | string[] | TemplateRef<any>[]
     */
    @Input('thyIconTemplate')
    set thyIconTemplate(value: string | TemplateRef<any> | string[] | TemplateRef<any>[]) {
        this.icons = value;
        if (!this.icons) {
            this.iconValue = null;
            this.iconTemplate = null;
        } else {
            this.setIconTemplate();
        }
    }

    /**
     * 当前值hover时的回调
     */
    @Output() readonly thyItemHoverChange = new EventEmitter<number>();

    @HostBinding('class.thy-rate') className = true;

    constructor(private cdr: ChangeDetectorRef) {
        super();
    }

    get thyValue(): number {
        return this._value;
    }

    set thyValue(value: number) {
        if (this._value === value) {
            return;
        }
        this._value = value;
        this.hasHalf = !Number.isInteger(value);
        this.currentValue = Math.ceil(value);
    }

    writeValue(value: number): void {
        this.thyValue = value || 0;
        this.updateRateArray();
        this.cdr.markForCheck();
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { thyCount, thyValue } = changes;
        if (thyCount) {
            this.updateRateArray();
        }

        if (thyValue) {
            this.updateItemStyle();
        }
        this.cdr.detectChanges();
    }

    itemHover(isHalf: boolean, index: number): void {
        if (this.thyDisabled || (this.currentValue === index + 1 && this.hasHalf === isHalf)) {
            return;
        }
        this.currentValue = index + 1;
        this.hasHalf = isHalf;
        const _value = isHalf ? Number(this.currentValue - 0.5) : this.currentValue;
        this.thyItemHoverChange.emit(_value);
        this.updateItemStyle();
    }

    itemClick(isHalf: boolean, index: number) {
        if (this.thyDisabled) {
            return;
        }
        this.currentValue = index + 1;
        const _value = isHalf ? index + 1 - 0.5 : index + 1;
        if (this.thyValue === _value) {
            if (this.thyAllowClear) {
                this.thyValue = 0;
                this.onChangeCallback(this.thyValue);
                this.onTouchedCallback();
            }
        } else {
            this.thyValue = _value;
            this.onChangeCallback(this.thyValue);
            this.onTouchedCallback();
        }
        this.updateItemStyle();
    }

    onRateLeave(event: Event): void {
        event.stopPropagation();
        this.hasHalf = !Number.isInteger(this.thyValue);
        this.currentValue = Math.ceil(this.thyValue);
        this.updateItemStyle();
    }

    updateRateArray(): void {
        this.rateArray = Array(this.thyCount)
            .fill(0)
            .map((_, i) => {
                return i;
            });
        this.updateItemStyle();
    }

    updateItemStyle(): void {
        this.updateIcon();
        const rateStyle = 'thy-rate-star';
        this.rateStyleArray = this.rateArray.map(i => {
            const value = i + 1;
            return {
                [`${rateStyle}--full`]: value < this.currentValue || (value === this.currentValue && !this.hasHalf),
                [`${rateStyle}--half`]: this.hasHalf && value === this.currentValue,
                [`${rateStyle}--active`]: this.hasHalf && value === this.currentValue,
                [`${rateStyle}--zero`]: value > this.currentValue
            };
        });
    }

    updateIcon(): void {
        if (!this.icons) {
            this.iconValue = null;
            this.iconTemplate = null;
        } else {
            this.setIconTemplate();
        }
    }

    setIconTemplate(): void {
        if (helpers.isArray(this.icons) && this.icons.length > 0) {
            const currentIcon = (this.currentValue && this.currentValue - 1) || 0;
            if (this.icons[currentIcon] instanceof TemplateRef) {
                this.iconTemplate = this.icons[currentIcon] as TemplateRef<any>;
            } else {
                this.iconValue = this.icons[currentIcon] as string;
            }
        } else if (!helpers.isArray(this.icons)) {
            if (this.icons instanceof TemplateRef) {
                this.iconTemplate = this.icons;
            } else {
                this.iconValue = this.icons;
            }
        }
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

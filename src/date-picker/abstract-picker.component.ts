import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import {
    ChangeDetectorRef,
    computed,
    Directive,
    inject,
    input,
    model,
    Input,
    Signal,
    signal,
    output,
    viewChild,
    effect
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDatePickerConfigService } from './date-picker.service';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPicker } from './picker.component';
import { makeValue, setValueByTimestampPrecision, transformDateValue } from './picker.util';
import {
    ThyCompatibleDate,
    CompatiblePresets,
    DateEntry,
    DisabledDateFn,
    ThyDateChangeEvent,
    ThyDateGranularity,
    ThyDateRangeEntry,
    ThyPanelMode,
    ThyShortcutPosition
} from './standard-types';

/**
 * @private
 */
@Directive()
export abstract class AbstractPickerComponent extends TabIndexDisabledControlValueAccessorMixin implements ControlValueAccessor {
    private datePickerConfigService = inject(ThyDatePickerConfigService);

    cdr = inject(ChangeDetectorRef);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    /**
     * 模式
     * @type decade | year | month | date | week | flexible
     */
    readonly thyMode = model<ThyPanelMode>('date');

    /**
     * 是否显示清除按钮
     */
    readonly thyAllowClear = input(true, { transform: coerceBooleanProperty });

    /**
     * 是否自动获取焦点
     */
    readonly thyAutoFocus = input(false, { transform: coerceBooleanProperty });

    readonly thyOpen = model<boolean>();

    readonly thyDisabledDate = input<DisabledDateFn>();

    /**
     * 最小值
     */
    readonly thyMinDate = input<Date | number>();

    /**
     * 最大值
     */
    readonly thyMaxDate = input<Date | number>();

    /**
     * 是否只读
     */
    readonly thyReadonly = input(false, { transform: coerceBooleanProperty });

    /**
     * 选择器 className
     */
    readonly thyOriginClassName = input<string>();

    /**
     * 弹出层 className
     */
    readonly thyPanelClassName = input<string>();

    /**
     * 输入框的大小
     */
    readonly thySize = input<'lg' | 'md' | 'sm' | 'xs' | 'default'>('default');

    /**
     * 设置时间戳精度
     * @default seconds 10位
     */
    readonly thyTimestampPrecision = input<'seconds' | 'milliseconds'>(
        this.datePickerConfigService.config?.timestampPrecision || 'seconds'
    );

    /**
     * 展示的日期格式
     * @default yyyy-MM-dd
     */
    readonly thyFormat = model<string>();

    /**
     * 区间分隔符，不传值默认为 "~"
     */
    readonly thySeparator = input<string, string>(` ${this.datePickerConfigService.config?.separator?.trim()} `, {
        transform: (value: string) => {
            return ` ${value?.trim()} `;
        }
    });

    /**
     * @description.en-us only for range picker, Whether to automatically take the beginning and ending unixTime of the day
     * @description.zh-cn 是否取值开始日期的00:00以及截止日期的24:00
     */
    readonly thyAutoStartAndEnd = input(false, { transform: coerceBooleanProperty });

    /**
     * 面板默认日期
     */
    readonly thyDefaultPickerValue = input<ThyCompatibleDate | number | null>(null);

    /**
     * 自定义的后缀图标
     */
    readonly thySuffixIcon = input('calendar');

    /**
     * 是否展示快捷选项面板
     */
    readonly thyShowShortcut = input(false, { transform: coerceBooleanProperty });

    /**
     * 快捷选项面板的显示位置
     * @type left | bottom
     */
    readonly thyShortcutPosition = input('left', {
        transform: (value: ThyShortcutPosition) => value || 'left'
    });

    /**
     * 自定义快捷选项
     */
    readonly thyShortcutPresets = input<CompatiblePresets>();

    /**
     * 日期变化的回调
     */
    readonly thyDateChange = output<ThyDateChangeEvent>();

    readonly thyOpenChange = output<boolean>();

    public picker = viewChild<ThyPicker>(ThyPicker);

    /**
     * 是否禁用
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDisabled(value: boolean) {
        this.disabled = value;
    }
    get thyDisabled(): boolean {
        return this.disabled;
    }

    /**
     * 时区，不传使用默认时区
     */
    readonly thyTimeZone = input<string>();

    disabled = false;

    readonly isRange = signal(false);

    /**
     * 输入框提示文字
     */
    readonly thyPlaceHolder = model<string | string[]>(undefined);

    readonly thyValue = signal<CompatibleValue | null>(undefined);

    withTime: boolean;

    readonly flexible = computed<boolean>(() => this.thyMode() === 'flexible');

    flexibleDateGranularity: ThyDateGranularity;

    private onlyEmitDate = false;

    protected originWithTime: boolean;

    protected innerValue: ThyCompatibleDate;

    readonly realOpenState = computed<boolean>(() => {
        return this.picker().realOpenState();
    });

    readonly isShowDatePopup = computed<boolean>(() => {
        return this.picker().isShowDatePopup();
    });

    constructor() {
        super();

        effect(() => {
            if (this.thyTimeZone()) {
                this.setValue(this.innerValue);
            }
        });
    }

    ngOnInit(): void {
        this.initValue();
        this.initPlaceHolder();
    }

    initValue(): void {
        this.thyValue.set(this.isRange() ? [] : null);
    }

    initPlaceHolder(): void {
        if (this.thyPlaceHolder() === undefined) {
            const defaultPlaceholder = this.isRange() ? [this.locale().startDate, this.locale().endDate] : this.locale().placeholder;
            this.thyPlaceHolder.set(defaultPlaceholder);
        }
    }

    onDateValueChange(event: ThyDateChangeEvent) {
        console.log('====onDateValueChange==>', event);
        this.thyDateChange.emit(event);
    }

    closeOverlay(): void {
        this.picker().hideOverlay();
    }

    getAutoStartAndEndValue(begin: TinyDate, end: TinyDate) {
        let value: { begin: number; end: number };
        switch (this.thyMode()) {
            case 'date':
                value = { begin: begin.startOfDay().getUnixTime(), end: end.endOfDay().getUnixTime() };
                break;
            case 'week':
                value = { begin: begin.startOfWeek().getUnixTime(), end: end.endOfWeek().getUnixTime() };
                break;
            case 'month':
                value = { begin: begin.startOfMonth().getUnixTime(), end: end.endOfMonth().getUnixTime() };
                break;
            case 'year':
                value = { begin: begin.startOfYear().getUnixTime(), end: end.endOfYear().getUnixTime() };
                break;
            default:
                value = { begin: begin.startOfDay().getUnixTime(), end: end.endOfDay().getUnixTime() };
                break;
        }
        return value;
    }

    onValueChange(originalValue: CompatibleValue | RangeAdvancedValue): void {
        this.setFormatRule();
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);
        this.flexibleDateGranularity = flexibleDateGranularity;
        this.setValue(value);
        if (this.isRange()) {
            const vAsRange: any = this.thyValue();
            let value = { begin: null, end: null } as ThyDateRangeEntry;
            if (vAsRange.length) {
                const [begin, end] = vAsRange as TinyDate[];
                if (this.thyAutoStartAndEnd()) {
                    value = this.getAutoStartAndEndValue(begin, end);
                } else {
                    value = { begin: begin.getUnixTime(), end: end.getUnixTime() };
                }
            }
            const [beginUnixTime, endUnixTime] = this.setValueByPrecision(value) as number[];
            this.onChangeFn(
                Object.assign({ begin: beginUnixTime, end: endUnixTime }, this.flexible() ? { granularity: flexibleDateGranularity } : {})
            );
        } else {
            const value = { date: null, with_time: this.withTime ? 1 : 0 } as DateEntry;
            if (this.thyValue()) {
                value.date = (this.thyValue() as TinyDate).getUnixTime();
            }
            if (this.onlyEmitDate) {
                this.onChangeFn(this.setValueByPrecision(value.date) as number);
            } else {
                this.onChangeFn(Object.assign(value, { date: this.setValueByPrecision(value.date) as number }));
            }
        }
    }

    setFormatRule() {
        if (!this.thyFormat()) {
            if (this.withTime) {
                this.thyFormat.set('yyyy-MM-dd HH:mm');
            } else {
                if (!this.onlyEmitDate) {
                    this.thyFormat.set('yyyy-MM-dd');
                }
            }
        }
    }

    onOpenChange(open: boolean): void {
        this.thyOpen.set(open);
        this.thyOpenChange.emit(open);
    }

    onChangeFn: (val: ThyCompatibleDate | DateEntry | ThyDateRangeEntry | number | null) => void = () => void 0;

    writeValue(originalValue: ThyCompatibleDate | ThyDateRangeEntry): void {
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);
        this.flexibleDateGranularity = flexibleDateGranularity;
        this.innerValue = value;
        if (this.flexible() && value && (value as Date[]).length) {
            if (!this.flexibleDateGranularity) {
                this.flexibleDateGranularity = 'day';
            }
        }

        this.setValue(value);
        this.setTimePickerState(withTime);
        this.onlyEmitDate = typeof withTime === 'undefined';
        this.originWithTime = withTime;
        this.setFormatRule();
        this.cdr.markForCheck();
    }

    setTimePickerState(withTime: boolean): void {
        this.withTime = withTime;
        this.cdr.markForCheck();
    }

    setDisabledState(disabled: boolean): void {
        this.thyDisabled = disabled;
        this.cdr.markForCheck();
    }

    private setValue(value: ThyCompatibleDate): void {
        this.thyValue.set(makeValue(value, this.isRange(), this.thyTimeZone()));
    }

    private setValueByPrecision(value: ThyCompatibleDate | number | Date | DateEntry | ThyDateRangeEntry | SafeAny): number | number[] {
        return setValueByTimestampPrecision(value, this.isRange(), this.thyTimestampPrecision(), this.thyTimeZone());
    }
}

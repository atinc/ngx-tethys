import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import {
    ChangeDetectorRef,
    computed,
    Directive,
    inject,
    Input,
    input,
    signal,
    effect,
    OnChanges,
    OnInit,
    output,
    Signal,
    SimpleChanges,
    viewChild,
    model,
    DestroyRef,
    linkedSignal
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
export abstract class AbstractPickerComponent
    extends TabIndexDisabledControlValueAccessorMixin
    implements OnInit, OnChanges, ControlValueAccessor
{
    protected destroyRef = inject(DestroyRef);

    cdr = inject(ChangeDetectorRef);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    thyValue: CompatibleValue | null;

    panelMode: ThyPanelMode | ThyPanelMode[];

    _panelMode: ThyPanelMode = 'date';

    private datePickerConfigService = inject(ThyDatePickerConfigService);

    /**
     * 模式
     * @type decade | year | month | date | week | flexible
     */
    @Input() set thyMode(value: ThyPanelMode) {
        this._panelMode = value ?? 'date';
    }

    get thyMode() {
        return this._panelMode;
    }

    /**
     * 是否显示清除按钮
     */
    readonly thyAllowClear = input(true, { transform: coerceBooleanProperty });

    /**
     * 是否自动获取焦点
     */
    readonly thyAutoFocus = input(false, { transform: coerceBooleanProperty });

    readonly thyOpen = input(undefined, { transform: coerceBooleanProperty });

    readonly opened = linkedSignal(this.thyOpen);

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
     * 输入框提示文字
     * @type string | string[]
     */
    readonly thyPlaceHolder = input<string | string[]>(undefined);

    readonly placeholder = signal<string | string[]>(undefined);

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
    readonly thySeparator = input<string>(this.datePickerConfigService.config?.separator);

    readonly separator: Signal<string> = computed(() => {
        return ` ${this.thySeparator()?.trim()} `;
    });

    /**
     * @description.en-us only for range picker, Whether to automatically take the beginning and ending unixTime of the day
     * @description.zh-cn 是否取值开始日期的00:00以及截止日期的24:00
     * @default false
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
     * @default false
     */
    readonly thyShowShortcut = input(undefined, { transform: coerceBooleanProperty });

    /**
     * 快捷选项面板的显示位置
     * @type left | bottom
     */
    readonly thyShortcutPosition = input('left', { transform: (value: ThyShortcutPosition) => value || 'left' });

    /**
     * 自定义快捷选项
     * @type ThyShortcutPreset[]
     */
    readonly thyShortcutPresets = input<CompatiblePresets>();

    /**
     * 是否支持选择时间
     */
    readonly thyShowTime = input(false, {
        transform: (value: object | boolean) => (typeof value === 'object' ? value : coerceBooleanProperty(value))
    });

    /**
     * 是否展示时间(时、分)
     */
    readonly thyMustShowTime = input(false, { transform: coerceBooleanProperty });

    readonly showWeek = computed<boolean>(() => this.thyMode === 'week');

    readonly flexible = computed<boolean>(() => this.thyMode === 'flexible');

    /**
     * 日期变化的回调
     */
    readonly thyDateChange = output<ThyDateChangeEvent>();

    readonly thyOpenChange = output<boolean>();

    readonly picker = viewChild<ThyPicker>(ThyPicker);

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

    isRange: boolean;

    withTime: boolean;

    flexibleDateGranularity: ThyDateGranularity;

    protected isCustomPlaceHolder = false;

    private onlyEmitDate = false;

    protected originWithTime: boolean;

    protected innerValue: ThyCompatibleDate;

    get realOpenState(): boolean {
        return this.picker().realOpenState;
    }

    get isShowDatePopup(): boolean {
        return this.picker().isShowDatePopup;
    }

    initValue(): void {
        this.thyValue = this.isRange ? [] : null;
    }

    constructor() {
        super();

        effect(() => {
            if (this.isCustomPlaceHolder) {
                this.placeholder.set(this.thyPlaceHolder());
            }
        });

        effect(() => {
            if (this.thyTimeZone()) {
                this.setValue(this.innerValue);
            }
        });
    }

    ngOnInit(): void {
        this.setDefaultPlaceHolder();
        this.setDefaultTimePickerState();
        this.initValue();
    }

    onDateValueChange(event: ThyDateChangeEvent) {
        this.thyDateChange.emit(event);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyPlaceHolder && changes.thyPlaceHolder.firstChange && typeof changes.thyPlaceHolder.currentValue !== 'undefined') {
            this.isCustomPlaceHolder = true;
        }
    }

    closeOverlay(): void {
        this.picker().hideOverlay();
    }

    getAutoStartAndEndValue(begin: TinyDate, end: TinyDate) {
        let value: { begin: number; end: number };
        switch (this.thyMode) {
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
        if (this.isRange) {
            const vAsRange: any = this.thyValue;
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
            if (this.thyValue) {
                value.date = (this.thyValue as TinyDate).getUnixTime();
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
        this.opened.set(open);
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
    }

    // Displays the time directly when the time must be displayed by default
    setDefaultTimePickerState() {
        this.withTime = this.thyMustShowTime();
    }

    // Restore after clearing time to select whether the original picker time is displayed or not
    restoreTimePickerState(value: CompatibleValue | null) {
        if (!value) {
            this.withTime = this.thyMustShowTime() || this.originWithTime;
        }
    }

    setPanelMode() {
        const mode = this.thyMode ?? 'date';
        if (this.isRange) {
            this.panelMode = this.flexible() ? ['date', 'date'] : [mode, mode];
        } else {
            this.panelMode = mode;
        }
    }

    setDisabledState(disabled: boolean): void {
        this.thyDisabled = disabled;
        this.cdr.markForCheck();
    }

    private setDefaultPlaceHolder(): void {
        if (!this.isCustomPlaceHolder) {
            const placeholder = this.isRange ? [this.locale().startDate, this.locale().endDate] : this.locale().placeholder;
            this.placeholder.set(placeholder);
        }
    }

    public setValue(value: ThyCompatibleDate): void {
        this.thyValue = makeValue(value, this.isRange, this.thyTimeZone());
    }

    private setValueByPrecision(value: ThyCompatibleDate | number | Date | DateEntry | ThyDateRangeEntry | SafeAny): number | number[] {
        return setValueByTimestampPrecision(value, this.isRange, this.thyTimestampPrecision(), this.thyTimeZone());
    }
}

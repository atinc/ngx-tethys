import { TabIndexDisabledControlValueAccessorMixin } from 'ngx-tethys/core';
import { coerceBooleanProperty, TinyDate } from 'ngx-tethys/util';
import { Subject } from 'rxjs';

import {
    ChangeDetectorRef,
    computed,
    Directive,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    Signal,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { injectLocale, ThyDatePickerLocale } from 'ngx-tethys/i18n';
import { SafeAny } from 'ngx-tethys/types';
import { ThyDatePickerConfigService } from './date-picker.service';
import { CompatibleValue, RangeAdvancedValue } from './inner-types';
import { ThyPicker } from './picker.component';
import { makeValue, setValueByTimestampPrecision, transformDateValue } from './picker.util';
import {
    CompatibleDate,
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
    implements OnInit, OnChanges, OnDestroy, ControlValueAccessor
{
    cdr = inject(ChangeDetectorRef);

    locale: Signal<ThyDatePickerLocale> = injectLocale('datePicker');

    thyValue: CompatibleValue | null;

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
    @Input({ transform: coerceBooleanProperty }) thyAllowClear = true;

    /**
     * 是否自动获取焦点
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAutoFocus = false;

    @Input({ transform: coerceBooleanProperty }) thyOpen: boolean;

    @Input() thyDisabledDate: DisabledDateFn;

    /**
     * 最小值
     * @type Date | number
     */
    @Input() thyMinDate: Date | number;

    /**
     * 最大值
     * @type Date | number
     */
    @Input() thyMaxDate: Date | number;

    /**
     * 输入框提示文字
     * @type string | string[]
     */
    @Input() thyPlaceHolder: string | string[];

    /**
     * 是否只读
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyReadonly: boolean;

    /**
     * 选择器 className
     */
    @Input() thyOriginClassName: string;

    /**
     * 弹出层 className
     */
    @Input() thyPanelClassName: string;

    /**
     * 输入框的大小
     * @type xs | sm | md | lg | default
     */
    @Input() thySize: 'lg' | 'md' | 'sm' | 'xs' | 'default' = 'default';

    /**
     * 设置时间戳精度
     * @default seconds 10位
     */
    @Input() thyTimestampPrecision: 'seconds' | 'milliseconds' = this.datePickerConfigService.config?.timestampPrecision || 'seconds';

    /**
     * 展示的日期格式
     * @default yyyy-MM-dd
     */
    @Input() thyFormat: string;

    /**
     * 区间分隔符，不传值默认为 "~"
     */
    @Input() thySeparator: string = this.datePickerConfigService.config?.separator;

    separator: Signal<string> = computed(() => {
        return ` ${this.thySeparator?.trim()} `;
    });

    /**
     * @description.en-us only for range picker, Whether to automatically take the beginning and ending unixTime of the day
     * @description.zh-cn 是否取值开始日期的00:00以及截止日期的24:00
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAutoStartAndEnd = false;

    /**
     * 面板默认日期
     * @type CompatibleDate | number | null
     */
    @Input() thyDefaultPickerValue: CompatibleDate | number | null = null;

    /**
     * 自定义的后缀图标
     */
    @Input() thySuffixIcon = 'calendar';

    /**
     * 是否展示快捷选项面板
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyShowShortcut: boolean;

    /**
     * 快捷选项面板的显示位置
     * @type left | bottom
     */
    @Input() set thyShortcutPosition(position: ThyShortcutPosition) {
        if (!!position) {
            this.shortcutPosition = position;
        }
    }

    /**
     * 自定义快捷选项
     * @type ThyShortcutPreset[]
     */
    @Input() set thyShortcutPresets(presets: CompatiblePresets) {
        this.shortcutPresets = presets;
    }

    /**
     * 日期变化的回调
     */
    @Output() readonly thyDateChange = new EventEmitter<ThyDateChangeEvent>();

    @Output() readonly thyOpenChange = new EventEmitter<boolean>();

    @ViewChild(ThyPicker, { static: true }) public picker: ThyPicker;

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
    @Input() thyTimeZone: string;

    disabled = false;

    shortcutPosition: ThyShortcutPosition = 'left';

    shortcutPresets: CompatiblePresets;

    isRange: boolean;

    withTime: boolean;

    flexible: boolean;

    flexibleDateGranularity: ThyDateGranularity;

    protected destroyed$: Subject<void> = new Subject();
    protected isCustomPlaceHolder = false;
    private onlyEmitDate = false;
    protected originWithTime: boolean;
    protected innerValue: CompatibleDate;

    get realOpenState(): boolean {
        return this.picker.realOpenState;
    }

    get isShowDatePopup(): boolean {
        return this.picker.isShowDatePopup;
    }

    initValue(): void {
        this.thyValue = this.isRange ? [] : null;
    }

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.setDefaultPlaceHolder();
        this.initValue();
        this.isFlexible();
    }

    isFlexible() {
        this.flexible = this.thyMode === 'flexible';
    }

    onDateValueChange(event: ThyDateChangeEvent) {
        this.thyDateChange.emit(event);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyPlaceHolder && changes.thyPlaceHolder.firstChange && typeof this.thyPlaceHolder !== 'undefined') {
            this.isCustomPlaceHolder = true;
        }
        if (changes.thyTimeZone && changes.thyTimeZone.currentValue) {
            this.setValue(this.innerValue);
        }
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    closeOverlay(): void {
        this.picker.hideOverlay();
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
                if (this.thyAutoStartAndEnd) {
                    value = this.getAutoStartAndEndValue(begin, end);
                } else {
                    value = { begin: begin.getUnixTime(), end: end.getUnixTime() };
                }
            }
            const [beginUnixTime, endUnixTime] = this.setValueByPrecision(value) as number[];
            this.onChangeFn(
                Object.assign({ begin: beginUnixTime, end: endUnixTime }, this.flexible ? { granularity: flexibleDateGranularity } : {})
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
        if (!this.thyFormat) {
            if (this.withTime) {
                this.thyFormat = 'yyyy-MM-dd HH:mm';
            } else {
                if (!this.onlyEmitDate) {
                    this.thyFormat = 'yyyy-MM-dd';
                }
            }
        }
    }

    onOpenChange(open: boolean): void {
        this.thyOpen = open;
        this.thyOpenChange.emit(open);
    }

    onChangeFn: (val: CompatibleDate | DateEntry | ThyDateRangeEntry | number | null) => void = () => void 0;

    writeValue(originalValue: CompatibleDate | ThyDateRangeEntry): void {
        const { value, withTime, flexibleDateGranularity } = transformDateValue(originalValue);
        this.flexibleDateGranularity = flexibleDateGranularity;
        this.innerValue = value;
        if (this.flexible && value && (value as Date[]).length) {
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

    setDisabledState(disabled: boolean): void {
        this.thyDisabled = disabled;
        this.cdr.markForCheck();
    }

    private setDefaultPlaceHolder(): void {
        if (!this.isCustomPlaceHolder) {
            this.thyPlaceHolder = this.isRange ? [this.locale().startDate, this.locale().endDate] : this.locale().placeholder;
        }
        this.cdr.markForCheck();
    }

    public setValue(value: CompatibleDate): void {
        this.thyValue = makeValue(value, this.isRange, this.thyTimeZone);
    }

    private setValueByPrecision(value: CompatibleDate | number | Date | DateEntry | ThyDateRangeEntry | SafeAny): number | number[] {
        return setValueByTimestampPrecision(value, this.isRange, this.thyTimestampPrecision, this.thyTimeZone);
    }
}

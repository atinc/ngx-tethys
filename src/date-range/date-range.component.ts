import { ChangeDetectorRef, Component, computed, forwardRef, inject, Signal, input, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThyPopover } from 'ngx-tethys/popover';
import { DateRangeItemInfo } from './date-range.class';
import { OptionalDateRanges } from './optional-dates/optional-dates.component';

import { NgClass } from '@angular/common';
import { ThyAction } from 'ngx-tethys/action';
import { ThyDatePickerConfigService, ThyDatePickerFormatPipe } from 'ngx-tethys/date-picker';
import { injectLocale, ThyDateRangeLocale } from 'ngx-tethys/i18n';
import { ThyIcon } from 'ngx-tethys/icon';
import {
    addDays,
    addMonths,
    addYears,
    coerceBooleanProperty,
    endOfDay,
    endOfISOWeek,
    endOfMonth,
    getUnixTime,
    isSameDay,
    startOfDay,
    startOfISOWeek,
    startOfMonth,
    TinyDate
} from 'ngx-tethys/util';

const allDayTimestamp = 24 * 60 * 60;

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyDateRange),
    multi: true
};

/**
 * 预设时间段及自定义时间段选择组件
 * @name thy-date-range
 * @order 10
 */
@Component({
    selector: 'thy-date-range',
    templateUrl: './date-range.component.html',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR],
    imports: [ThyAction, ThyIcon, NgClass, ThyDatePickerFormatPipe]
})
export class ThyDateRange implements ControlValueAccessor {
    private thyPopover = inject(ThyPopover);
    private cdr = inject(ChangeDetectorRef);
    private locale: Signal<ThyDateRangeLocale> = injectLocale('dateRange');
    private datePickerConfigService = inject(ThyDatePickerConfigService);

    /**
     * 自定义可选值列表项
     * @type DateRangeItemInfo[]
     */
    readonly thyOptionalDateRanges = input<DateRangeItemInfo[]>();

    /**
     * 隐藏下拉选择时间段
     * @default false
     */
    readonly thyHiddenMenu = input(false, { transform: coerceBooleanProperty });

    /**
     * 禁用左右切换时间段
     * @default false
     */
    readonly thyDisabledSwitch = input(false, { transform: coerceBooleanProperty });

    /**
     * 自定义日期选择的展示文字
     * @default 自定义
     */
    readonly thyCustomTextValue = input(this.locale().custom);

    /**
     * 自定义日期选择中可选择的最小时间
     * @type Date | number
     */
    readonly thyMinDate = input<Date | number>(undefined);

    /**
     * 自定义日期选择中可选择的最大时间
     * @type Date | number
     */
    readonly thyMaxDate = input<Date | number>(undefined);

    /**
     * 选中的时间段的展示形式，
     * <br/> `custom`形式：`2023-07-01 ~ 2023-07-31`；
     * <br/> `exception`形式：`2023-07-01`，具体展示还与`thyPickerFormat`有关。
     */
    readonly thyCustomKey = input<'custom' | 'exception'>('custom');

    /**
     * 自定义日期展示格式，比如`yyyy年MM月`，只有当`thyCustomKey`值设为`exception`时才会生效
     */
    readonly thyPickerFormat = input<string>(undefined);

    /**
     * 自定义日期禁用日期
     */
    readonly thyDisabledDate = input<(d: Date) => boolean>(undefined);

    /**
     * 区间分隔符，不传值默认为 "~"
     */
    readonly thySeparator = input<string>(this.datePickerConfigService.config?.separator);

    separator = computed(() => {
        return ` ${this.thySeparator()?.trim()} `;
    });

    /**
     * 自定义日期选择日期回调
     * @type EventEmitter<Date[]>
     */
    readonly thyOnCalendarChange = output<Date[]>();

    public selectedDate?: DateRangeItemInfo;

    private defaultOptionalDateRanges: DateRangeItemInfo[] = [
        {
            key: 'week',
            text: this.locale().currentWeek,
            begin: getUnixTime(startOfISOWeek(new TinyDate().getTime())),
            end: getUnixTime(endOfISOWeek(new TinyDate().getTime())),
            timestamp: {
                interval: 7,
                unit: 'day'
            }
        },
        {
            key: 'month',
            text: this.locale().currentMonth,
            begin: getUnixTime(startOfMonth(new TinyDate().getTime())),
            end: getUnixTime(endOfMonth(new TinyDate().getTime())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];

    public optionalDateRanges = computed<DateRangeItemInfo[]>(() => {
        if (this.thyOptionalDateRanges()?.length > 0) {
            return this.thyOptionalDateRanges();
        }
        return this.defaultOptionalDateRanges;
    });

    public selectedDateRange: {
        begin: number;
        end: number;
    };

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    writeValue(value: any): void {
        if (value) {
            this.selectedDate = value;
        } else if (this.optionalDateRanges().length > 0) {
            this.selectedDate = this.optionalDateRanges()[0];
            this.onModelChange(this.selectedDate);
        }
        this._setSelectedDateRange();
        this.cdr.detectChanges();
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    private _setSelectedDateRange() {
        this.selectedDateRange = {
            begin: this.selectedDate.begin,
            end: this.selectedDate.end
        };
    }

    private _calculateNewTime(type: string) {
        if (this.selectedDate.timestamp) {
            const beginDate = new TinyDate(this.selectedDate.begin * 1000)?.nativeDate;
            const endDate = new TinyDate(this.selectedDate.end * 1000)?.nativeDate;
            const interval = this.selectedDate.timestamp.interval;

            if (this.selectedDate.timestamp.unit === 'day') {
                if (type === 'previous') {
                    return {
                        begin: getUnixTime(addDays(beginDate, -1 * interval)),
                        end: getUnixTime(addDays(endDate, -1 * interval)),
                        key: this.thyCustomKey()
                    };
                } else {
                    return {
                        begin: getUnixTime(addDays(beginDate, 1 * interval)),
                        end: getUnixTime(addDays(endDate, 1 * interval)),
                        key: this.thyCustomKey()
                    };
                }
            } else if (this.selectedDate.timestamp.unit === 'month') {
                if (type === 'previous') {
                    return {
                        begin: getUnixTime(addMonths(beginDate, -1 * interval)),
                        end: getUnixTime(endOfDay(addDays(beginDate, -1))),
                        key: this.thyCustomKey()
                    };
                } else {
                    const endIsEndDayOfMonth = isSameDay(endDate, endOfMonth(endDate));
                    return {
                        begin: getUnixTime(startOfDay(addDays(endDate, 1))),
                        end: endIsEndDayOfMonth
                            ? getUnixTime(endOfMonth(addMonths(endDate, 1 * interval)))
                            : getUnixTime(addMonths(endDate, 1 * interval)),
                        key: this.thyCustomKey()
                    };
                }
            } else if (this.selectedDate.timestamp.unit === 'year') {
                if (type === 'previous') {
                    return {
                        begin: getUnixTime(addYears(beginDate, -1 * interval)),
                        end: getUnixTime(addYears(endDate, -1 * interval)),
                        key: this.thyCustomKey()
                    };
                } else {
                    return {
                        begin: getUnixTime(addYears(beginDate, 1 * interval)),
                        end: getUnixTime(addYears(endDate, 1 * interval)),
                        key: this.thyCustomKey()
                    };
                }
            }
        } else {
            const interval: number = this.selectedDate.end - this.selectedDate.begin + allDayTimestamp;
            if (type === 'previous') {
                return {
                    begin: this.selectedDate.begin - interval,
                    end: this.selectedDate.end - interval,
                    key: this.thyCustomKey()
                };
            } else {
                return {
                    begin: this.selectedDate.begin + interval,
                    end: this.selectedDate.end + interval,
                    key: this.thyCustomKey()
                };
            }
        }
    }

    private _setPreviousOrNextDate(type: string) {
        this.selectedDate = Object.assign({}, this.selectedDate, this._calculateNewTime(type));
        this._setSelectedDateRange();
        this.onModelChange(this.selectedDate);
    }

    public previous() {
        this._setPreviousOrNextDate('previous');
    }

    public next() {
        this._setPreviousOrNextDate('next');
    }

    public openOptionalDateRangesMenu(event: Event) {
        if (this.thyHiddenMenu()) {
            return;
        }
        this.thyPopover.open(OptionalDateRanges, {
            origin: event.currentTarget as HTMLElement,
            hasBackdrop: true,
            backdropClass: 'thy-overlay-transparent-backdrop',
            offset: 0,
            manualClosure: true,
            originActiveClass: 'thy-date-range-text-active',
            initialState: {
                hiddenMenu: this.thyHiddenMenu(),
                optionalDateRanges: this.optionalDateRanges(),
                selectedDate: this.selectedDate,
                minDate: this.thyMinDate(),
                maxDate: this.thyMaxDate(),
                customValue: this.thyCustomTextValue(),
                customKey: this.thyCustomKey(),
                disabledDate: this.thyDisabledDate(),
                selectedDateRange: (dateRange: DateRangeItemInfo) => {
                    this.onModelChange(dateRange);
                    this.selectedDate = dateRange;
                },
                calendarChange: (date: Date[]) => {
                    this.thyOnCalendarChange.emit(date);
                }
            }
        });
    }
}

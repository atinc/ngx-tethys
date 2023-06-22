import { Component, forwardRef, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DateRangeItemInfo } from './date-range.class';
import { ThyPopover } from 'ngx-tethys/popover';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';

import { getUnixTime, startOfISOWeek, endOfISOWeek, endOfMonth, startOfMonth, addDays, addMonths, addYears } from 'date-fns';
import { ThyDatePickerFormatPipe } from 'ngx-tethys/date-picker';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { ThyIconNavComponent, ThyIconNavLinkComponent } from 'ngx-tethys/nav';
import { NgIf, NgClass } from '@angular/common';
import { InputBoolean } from 'ngx-tethys/core';

const allDayTimestamp = 24 * 60 * 60;

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyDateRangeComponent),
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
    standalone: true,
    imports: [NgIf, ThyIconNavComponent, ThyIconNavLinkComponent, ThyIconComponent, NgClass, ThyDatePickerFormatPipe]
})
export class ThyDateRangeComponent implements OnInit, ControlValueAccessor {
    /**
     * 自定义可选值列表项
     * @type DateRangeItemInfo[]
     */
    @Input()
    set thyOptionalDateRanges(value: DateRangeItemInfo[]) {
        this.optionalDateRanges = value.length > 0 ? value : this.optionalDateRanges;
    }

    /**
     * 隐藏下拉选择时间段
     * @default false
     */
    @Input() @InputBoolean() thyHiddenMenu = false;

    /**
     * 禁用左右切换时间段
     * @default false
     */
    @Input() @InputBoolean() thyDisabledSwitch = false;

    /**
     * 自定义日期选择的展示文字
     */
    @Input() thyCustomTextValue = '自定义';

    /**
     * 自定义日期选择中可选择的最小时间
     * @type Date | number
     */
    @Input() thyMinDate: Date | number;

    /**
     * 自定义日期选择中可选择的最大时间
     * @type Date | number
     */
    @Input() thyMaxDate: Date | number;

    /**
     * 值有`custom`和`exception`。当值为`exception`，`thyPickerFormat`设置的自定义格式才会生效
     * @type custom | exception
     */
    @Input() thyCustomKey: 'custom' | 'exception' = 'custom';

    /**
     * 自定义日期展示格式，只有当`thyCustomKey`值设为`custom`时才会生效
     */
    @Input() thyPickerFormat: string;

    /**
     * 自定义日期禁用日期
     */
    @Input() thyDisabledDate: (d: Date) => boolean;

    /**
     * 自定义日期选择日期回调
     * @type EventEmitter<Date[]>
     */
    @Output() readonly thyOnCalendarChange = new EventEmitter<Date[]>();

    public selectedDate?: DateRangeItemInfo;

    public optionalDateRanges: DateRangeItemInfo[] = [
        {
            key: 'week',
            text: '本周',
            begin: getUnixTime(startOfISOWeek(new Date())),
            end: getUnixTime(endOfISOWeek(new Date())),
            timestamp: {
                interval: 7,
                unit: 'day'
            }
        },
        {
            key: 'month',
            text: '本月',
            begin: getUnixTime(startOfMonth(new Date())),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];

    public selectedDateRange: {
        begin: number;
        end: number;
    };

    public onModelChange: Function = () => {};

    public onModelTouched: Function = () => {};

    constructor(private thyPopover: ThyPopover, private cdr: ChangeDetectorRef) {}

    writeValue(value: any): void {
        if (value) {
            this.selectedDate = value;
        } else if (this.optionalDateRanges.length > 0) {
            this.selectedDate = this.optionalDateRanges[0];
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

    ngOnInit() {}

    private _setSelectedDateRange() {
        this.selectedDateRange = {
            begin: this.selectedDate.begin,
            end: this.selectedDate.end
        };
    }

    private _calculateNewTime(type: string) {
        if (this.selectedDate.timestamp) {
            const beginDate = new Date(this.selectedDate.begin * 1000);
            const endDate = new Date(this.selectedDate.end * 1000);
            const interval = this.selectedDate.timestamp.interval;

            if (this.selectedDate.timestamp.unit === 'day') {
                if (type === 'previous') {
                    return {
                        begin: getUnixTime(addDays(beginDate, -1 * interval)),
                        end: getUnixTime(addDays(endDate, -1 * interval)),
                        key: this.thyCustomKey
                    };
                } else {
                    return {
                        begin: getUnixTime(addDays(beginDate, 1 * interval)),
                        end: getUnixTime(addDays(endDate, 1 * interval)),
                        key: this.thyCustomKey
                    };
                }
            } else if (this.selectedDate.timestamp.unit === 'month') {
                if (type === 'previous') {
                    if (beginDate.getDate() === 1) {
                        return {
                            begin: getUnixTime(addMonths(beginDate, -1 * interval)),
                            end: getUnixTime(endOfMonth(addMonths(endDate, -1 * interval))),
                            key: this.thyCustomKey
                        };
                    } else {
                        return {
                            begin: getUnixTime(addMonths(beginDate, -1 * interval)),
                            end: getUnixTime(addDays(beginDate, -1)),
                            key: this.thyCustomKey
                        };
                    }
                } else {
                    if (beginDate.getDate() === 1) {
                        return {
                            begin: getUnixTime(addMonths(beginDate, 1 * interval)),
                            end: getUnixTime(endOfMonth(addMonths(endDate, 1 * interval))),
                            key: this.thyCustomKey
                        };
                    } else {
                        return {
                            begin: getUnixTime(addDays(endDate, 1)),
                            end: getUnixTime(addMonths(endDate, 1 * interval)),
                            key: this.thyCustomKey
                        };
                    }
                }
            } else if (this.selectedDate.timestamp.unit === 'year') {
                if (type === 'previous') {
                    return {
                        begin: getUnixTime(addYears(beginDate, -1 * interval)),
                        end: getUnixTime(addYears(endDate, -1 * interval)),
                        key: this.thyCustomKey
                    };
                } else {
                    return {
                        begin: getUnixTime(addYears(beginDate, 1 * interval)),
                        end: getUnixTime(addYears(endDate, 1 * interval)),
                        key: this.thyCustomKey
                    };
                }
            }
        } else {
            const interval: number = this.selectedDate.end - this.selectedDate.begin + allDayTimestamp;
            if (type === 'previous') {
                return {
                    begin: this.selectedDate.begin - interval,
                    end: this.selectedDate.end - interval,
                    key: this.thyCustomKey
                };
            } else {
                return {
                    begin: this.selectedDate.begin + interval,
                    end: this.selectedDate.end + interval,
                    key: this.thyCustomKey
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
        if (this.thyHiddenMenu) {
            return;
        }
        this.thyPopover.open(OptionalDateRangesComponent, {
            origin: event.currentTarget as HTMLElement,
            hasBackdrop: true,
            backdropClass: 'thy-overlay-transparent-backdrop',
            offset: 0,
            manualClosure: true,
            originActiveClass: 'thy-date-range-text-active',
            initialState: {
                hiddenMenu: this.thyHiddenMenu,
                optionalDateRanges: this.optionalDateRanges,
                selectedDate: this.selectedDate,
                minDate: this.thyMinDate,
                maxDate: this.thyMaxDate,
                customValue: this.thyCustomTextValue,
                customKey: this.thyCustomKey,
                disabledDate: this.thyDisabledDate,
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

import { Component, forwardRef, OnInit, Input, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DateRangeItemInfo } from './date-range.class';
import { helpers } from '../util';
import { ThyPopover } from '../popover';
import { OptionalDateRangesComponent } from './optional-dates/optional-dates.component';

import { getUnixTime, startOfISOWeek, endOfISOWeek, endOfMonth, startOfMonth, addDays, addMonths, addYears } from 'date-fns';
const allDayTimestamp = 24 * 60 * 60;

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThyDateRangeComponent),
    multi: true
};

@Component({
    selector: 'thy-date-range',
    templateUrl: './date-range.component.html',
    providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class ThyDateRangeComponent implements OnInit, ControlValueAccessor {
    @Input()
    set thyOptionalDateRanges(value: DateRangeItemInfo[]) {
        this.optionalDateRanges = value.length > 0 ? value : this.optionalDateRanges;
    }

    @Input() thyHiddenMenu = false;

    @Input() thyDisabledSwitch = false;

    @Input() thyCustomTextValue = '自定义';

    @Input() thyMinDate: Date | number;

    @Input() thyMaxDate: Date | number;

    @Input() thyCustomKey: 'custom' | 'exception' = 'custom';

    @Input() thyPickerFormat: string;

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

    private _getNewDate(fullDate: Date, timestamp: { year?: number; month?: number; day?: number } = {}) {
        const newYear = fullDate.getFullYear() + (timestamp.year || 0);
        const newMonth = fullDate.getMonth() + (timestamp.month || 0);
        const newDate = fullDate.getDate() + (timestamp.day || 0);

        return helpers.formatDate(new Date(newYear, newMonth, newDate));
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
                    return {
                        begin: getUnixTime(addMonths(beginDate, -1 * interval)),
                        end: getUnixTime(addMonths(endDate, -1 * interval)),
                        key: this.thyCustomKey
                    };
                } else {
                    return {
                        begin: getUnixTime(addMonths(beginDate, 1 * interval)),
                        end: getUnixTime(addMonths(endDate, 1 * interval)),
                        key: this.thyCustomKey
                    };
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
                selectedDateRange: (dateRange: DateRangeItemInfo) => {
                    this.onModelChange(dateRange);
                    this.selectedDate = dateRange;
                }
            }
        });
    }
}

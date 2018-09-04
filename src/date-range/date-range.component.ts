import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DateRangeItemInfo } from './date-range.class';
import { helpers } from '../util';

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

    private _currentDayTime: any = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

    public selectedDate?: DateRangeItemInfo;

    public optionalDateRange: DateRangeItemInfo[] = [{
        key: 'week',
        text: '本周',
        begin: helpers.formatDate(this._currentDayTime) - (this._currentDayTime.getDay() - 1) * allDayTimestamp,
        end: helpers.formatDate(this._currentDayTime) + (7 - this._currentDayTime.getDay()) * allDayTimestamp,
        timestamp: {
            interval: 7,
            unit: 'day'
        }
    }, {
        key: 'month',
        text: '本月',
        begin: helpers.formatDate(new Date((new Date()).getFullYear(), (new Date()).getMonth(), 1)),
        end: helpers.formatDate(new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0)),
        timestamp: {
            interval: 1,
            unit: 'month'
        }
    }];

    public selectedDateRange: {
        begin: { date: number },
        end: { date: number }
    };

    @Input() dateRanges: DateRangeItemInfo[] = [];

    constructor() {

    }

    public onModelChange: Function = () => {

    }

    public onModelTouched: Function = () => {

    }

    writeValue(value: any): void {
        if (value) {
            this.selectedDate = value;
        } else {
            this.selectedDate = this.optionalDateRange[0];
            this.onModelChange(this.selectedDate);
        }
        this._setSelectedDateRange();
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    ngOnInit() {
        this.optionalDateRange = this.dateRanges.length > 0 ? this.dateRanges : this.optionalDateRange;
    }

    private _setSelectedDateRange() {
        this.selectedDateRange = {
            begin: { date: this.selectedDate.begin },
            end: { date: this.selectedDate.end }
        };
    }

    private _getNewDate(fullDate: Date, timestamp: { year?: number, month?: number, day?: number } = {}) {
        const newYear = fullDate.getFullYear() + (timestamp.year || 0);
        const newMonth = fullDate.getMonth() + (timestamp.month || 0);
        const newDate = fullDate.getDate() + (timestamp.day || 0);

        return helpers.formatDate(new Date(newYear, newMonth, newDate));
    }

    private _calculateNewTime(type: string) {
        if (this.selectedDate.timestamp) {
            const beginDate = new Date(this.selectedDate.begin * 1000);
            const endDate = new Date(this.selectedDate.end * 1000);
            if (this.selectedDate.timestamp.unit === 'day') {
                if (type === 'previous') {
                    return {
                        begin: this._getNewDate(beginDate, { day: -this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { day: -this.selectedDate.timestamp.interval }),
                        key: 'custom'
                    };
                } else {
                    return {
                        begin: this._getNewDate(beginDate, { day: this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { day: this.selectedDate.timestamp.interval }),
                        key: 'custom'
                    };
                }
            } else if (this.selectedDate.timestamp.unit === 'month') {
                if (type === 'previous') {
                    return {
                        begin: this._getNewDate(beginDate, { month: -this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { month: -this.selectedDate.timestamp.interval + 1, day: -endDate.getDate() }),
                        key: 'custom'
                    };
                } else {
                    return {
                        begin: this._getNewDate(beginDate, { month: this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { month: this.selectedDate.timestamp.interval + 1, day: -endDate.getDate() }),
                        key: 'custom'
                    };
                }
            } else if (this.selectedDate.timestamp.unit === 'year') {
                if (type === 'previous') {
                    return {
                        begin: this._getNewDate(beginDate, { year: -this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { year: -this.selectedDate.timestamp.interval }),
                        key: 'custom'
                    };
                } else {
                    return {
                        begin: this._getNewDate(beginDate, { year: this.selectedDate.timestamp.interval }),
                        end: this._getNewDate(endDate, { year: this.selectedDate.timestamp.interval }),
                        key: 'custom'
                    };
                }
            }
        } else {
            const interval: number = this.selectedDate.end - this.selectedDate.begin + allDayTimestamp;
            return {
                begin: this.selectedDate.begin - interval,
                end: this.selectedDate.end - interval,
                key: 'custom'
            };
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

    public selectDateRange(dateRange: DateRangeItemInfo) {
        this.selectedDate = dateRange;
        this._setSelectedDateRange();
        this.onModelChange(this.selectedDate);
    }

    public changeDate() {
        this.selectedDate = {
            begin: this.selectedDateRange.begin.date,
            end: this.selectedDateRange.end.date,
            key: 'custom',
        };
        this.onModelChange(this.selectedDate);
    }

}

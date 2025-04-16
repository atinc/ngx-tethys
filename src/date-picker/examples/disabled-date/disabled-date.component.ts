import { Component, OnInit } from '@angular/core';
import { ThyRangePicker, ThyMonthPicker, ThyQuarterPicker, ThyYearPicker, ThyDatePicker } from 'ngx-tethys/date-picker';
import { FormsModule } from '@angular/forms';
import { addDays, differenceInDays, endOfDay, startOfDay, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-disabled-date-example',
    templateUrl: './disabled-date.component.html',
    imports: [ThyDatePicker, FormsModule, ThyMonthPicker, ThyYearPicker, ThyQuarterPicker, ThyRangePicker]
})
export class ThyDatePickerDisabledDateExampleComponent implements OnInit {
    date: Date;

    start: Date;

    due: Date;

    limitDate = new TinyDate()?.nativeDate;

    defaultPickerValue = [new TinyDate('2020-01-12')?.nativeDate, new TinyDate('2020-02-20')?.nativeDate];

    minDate = new TinyDate('2020-01-11')?.nativeDate;

    maxDate = new TinyDate('2020-02-22')?.nativeDate;

    selectedDateRange: Date[] = [];

    dynamicDisabled: { begin: number; end: number };

    dateRange: { begin: number; end: number };

    minDateRange = startOfDay(addDays(new TinyDate().endOfWeek({ weekStartsOn: 1 }).getTime(), 3));

    maxDateRange = endOfDay(addDays(new TinyDate()?.nativeDate, -7));

    quarterDate = { date: new TinyDate('2023-02-22')?.nativeDate, with_time: 0 };

    constructor() {}

    ngOnInit() {}

    disableDate = (date: Date) => {
        if (!(this.selectedDateRange && this.selectedDateRange.length === 1)) {
            return false;
        }
        const tooLate = this.selectedDateRange.length > 0 && differenceInDays(date, this.selectedDateRange[0]) > 7;
        const tooEarly = this.selectedDateRange.length > 0 && differenceInDays(this.selectedDateRange[0], date) > 7;
        return tooEarly || tooLate;
    };

    disableDate1 = (date: Date) => {
        return date > this.limitDate;
    };

    calendarChange(date: Date[]) {
        this.selectedDateRange = date;
    }

    panelOpenChange(open: boolean) {
        if (!open) {
            this.selectedDateRange = [];
        }
    }
}

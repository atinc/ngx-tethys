import { Component, OnInit } from '@angular/core';
import { DateEntry, ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { endOfDay, startOfDay, subWeeks, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    dateShowTime = {
        date: 0,
        with_time: 1
    } as DateEntry;

    date = { date: new TinyDate()?.nativeDate, with_time: 0 };

    dateTime = 1234567890;
    flexibleDateTime = 1234567890;
    week = { date: new TinyDate()?.nativeDate, with_time: 0 };

    dateRange = { begin: new TinyDate('2023-10')?.nativeDate, end: new TinyDate('2023-12')?.nativeDate };

    weekRange = { begin: new TinyDate('2021-10-03')?.nativeDate, end: new TinyDate('2021-12-12')?.nativeDate };

    yearRange = { begin: new TinyDate('2021')?.nativeDate, end: new TinyDate('2028')?.nativeDate };

    quarterRange = { begin: new TinyDate('2023-6')?.nativeDate, end: new TinyDate('2023-12')?.nativeDate };

    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    shortcutMonthPresets = () => {
        return [
            {
                title: '最近6周',
                value: [subWeeks(startOfDay(new TinyDate()?.nativeDate), 5).getTime(), endOfDay(new TinyDate()?.nativeDate).getTime()]
            },
            {
                title: '最近12周',
                value: [subWeeks(startOfDay(new TinyDate()?.nativeDate), 11).getTime(), endOfDay(new TinyDate()?.nativeDate).getTime()]
            }
        ];
    };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
        console.log(this.dateTime);
    }

    allowClearChange() {
        this.isAllowClear = !this.isAllowClear;
    }
}

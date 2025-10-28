import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    DateEntry,
    ThyDatePicker,
    ThyDatePickerFormatStringPipe,
    ThyDateRangeEntry,
    ThyMonthPicker,
    ThyQuarterPicker,
    ThyYearPicker,
    ThyRangePicker
} from 'ngx-tethys/date-picker';
import { ThyFormGroup } from 'ngx-tethys/form';
import { endOfDay, startOfDay, subWeeks, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html',
    imports: [
        ThyFormGroup,
        ThyDatePicker,
        FormsModule,
        ThyMonthPicker,
        ThyYearPicker,
        ThyQuarterPicker,
        ThyRangePicker,
        ThyDatePickerFormatStringPipe
    ]
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    dateShowTime = {
        date: 0,
        with_time: 1
    } as DateEntry;

    tz = 'Asia/Seoul';

    date = new Date();
    dateTime = new Date();
    flexibleDateTime = new Date();
    week = { date: new TinyDate().getTime(), with_time: 0 };

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
                value: [subWeeks(startOfDay(new TinyDate().getTime()), 5).getTime(), endOfDay(new TinyDate().getTime()).getTime()]
            },
            {
                title: '最近12周',
                value: [subWeeks(startOfDay(new TinyDate().getTime()), 11).getTime(), endOfDay(new TinyDate().getTime()).getTime()]
            }
        ];
    };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }

    allowClearChange() {
        this.isAllowClear = !this.isAllowClear;
    }
}

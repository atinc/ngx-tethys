import { DateEntry, ThyDateRangeEntry } from 'ngx-tethys/date-picker';
import { Component, OnInit } from '@angular/core';
import { addWeeks, endOfDay, startOfDay, startOfWeek, subWeeks } from 'date-fns';

@Component({
    selector: 'thy-date-picker-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDatePickerBasicExampleComponent implements OnInit {
    dateShowTime = {
        date: 0,
        with_time: 1
    } as DateEntry;

    date = { date: new Date(), with_time: 0 };

    dateTime = 1234567890;
    flexibleDateTime = 1234567890;
    week = { date: new Date(), with_time: 0 };

    dateRange = { begin: new Date('2023-10'), end: new Date('2023-12') };

    weekRange = { begin: new Date('2021-10-03'), end: new Date('2021-12-12') };

    yearRange = { begin: new Date('2021'), end: new Date('2028') };

    quarterRange = { begin: new Date('2023-6'), end: new Date('2023-12') };

    flexibleDateRange: ThyDateRangeEntry;

    isAllowClear = true;

    shortcutMonthPresets = () => {
        return [
            {
                title: '最近6周',
                value: [subWeeks(startOfDay(new Date()), 5).getTime(), endOfDay(new Date()).getTime()]
            },
            {
                title: '最近12周',
                value: [subWeeks(startOfDay(new Date()), 11).getTime(), endOfDay(new Date()).getTime()]
            }
        ];
    };

    shortcutDatePresets = () => {
        return [
            {
                title: '今天',
                value: startOfDay(new Date()).getTime()
            },
            {
                title: '下周',
                value: startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 1 }).getTime()
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

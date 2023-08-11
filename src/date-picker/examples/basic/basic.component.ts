import { DateEntry, ThyDateRangeEntry, ThyPanelMode, ThyShortcutValueChange } from 'ngx-tethys/date-picker';
import { Component, OnInit } from '@angular/core';
import { addWeeks, endOfDay, startOfDay, startOfWeek, subDays, subMonths, subWeeks } from 'date-fns';
import { TinyDate } from 'ngx-tethys/util';

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

    dateRange = { begin: new Date('2021-10'), end: new Date('2021-12') };

    weekRange = { begin: new Date('2021-10-03'), end: new Date('2021-12-12') };

    yearRange = { begin: new Date('2021'), end: new Date('2028') };

    flexibleDateRange: ThyDateRangeEntry;

    dynamicDateRange: ThyDateRangeEntry = {
        begin: new TinyDate(subDays(new Date(), 6)).getTime(),
        end: new TinyDate().endOfDay().getTime(),
        shortcut_key: 'recent_7_days'
    };

    isAllowClear = true;

    dateUnitOptions = [
        {
            key: 'date',
            name: '日'
        },
        {
            key: 'week',
            name: '周'
        },
        {
            key: 'month',
            name: '月'
        },
        {
            key: 'year',
            name: '年'
        }
    ];

    dateUnit = 'date';

    mode: ThyPanelMode;

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

    dynamicShortcutPresets = () => {
        return [
            {
                title: '最近7天',
                value: [new TinyDate(subDays(new Date(), 6)).getTime(), new TinyDate().endOfDay().getTime()],
                shortcut_key: 'recent_7_days'
            },
            {
                title: '最近6周',
                value: [subWeeks(startOfDay(new Date()), 5).getTime(), endOfDay(new Date()).getTime()],
                shortcut_key: 'recent_6_weeks'
            },
            {
                title: '最近6个月',
                value: [subMonths(startOfDay(new Date()), 5).getTime(), endOfDay(new Date()).getTime()],
                shortcut_key: 'recent_6_months'
            },
            {
                title: '过去 N 天',
                value: [null, endOfDay(new Date()).getTime()],
                shortcut_key: 'recent_n_days'
            }
        ];
    };

    constructor() {}

    ngOnInit() {}

    onChange(result: ThyDateRangeEntry): void {
        // console.log('onChange: ', result);
        // console.log(this.dateTime);
        this.dynamicDateRange = result;
    }

    shortcutValueChange(event: ThyShortcutValueChange) {
        // console.log('shorcut:', event);
        this.dynamicDateRange = { ...this.dynamicDateRange, ...{ shortcut_key: event?.triggerPresets?.shortcut_key } };
    }

    selectDateUnit() {}

    allowClearChange() {
        this.isAllowClear = !this.isAllowClear;
    }
}

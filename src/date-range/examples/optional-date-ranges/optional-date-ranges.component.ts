import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import {
    addDays,
    addMonths,
    endOfMonth,
    endOfQuarter,
    getMonth,
    getUnixTime,
    setMonth,
    startOfMonth,
    startOfQuarter,
    TinyDate
} from 'ngx-tethys/util';

@Component({
    selector: 'app-date-range-optional-date-ranges',
    templateUrl: './optional-date-ranges.component.html'
})
export class ThyDateRangeOptionalDateRangesExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'season',
            text: '本季度',
            begin: getUnixTime(startOfQuarter(new TinyDate().getTime())),
            end: getUnixTime(endOfQuarter(new TinyDate().getTime())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        // 当前选中时间段为 [今天往前两个月 ~ 今天]，开始时间可能不是1号
        {
            key: 'lastTwoMonths',
            text: '最近两个月',
            begin: getUnixTime(addDays(addMonths(new TinyDate().getTime(), -2), +1)),
            end: getUnixTime(new TinyDate().getTime()),
            timestamp: {
                interval: 2,
                unit: 'month'
            }
        },
        // 当前选中时间段为 [当月月底往前三个月 ~ 当月月底最后1天]，开始时间始终是1号
        {
            key: 'lastThreeMonths',
            text: '最近三个月',
            begin: getUnixTime(startOfMonth(setMonth(new TinyDate().getTime(), getMonth(new TinyDate().getTime()) - 2))),
            end: getUnixTime(endOfMonth(new TinyDate().getTime())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    constructor() {}

    ngOnInit() {}
}

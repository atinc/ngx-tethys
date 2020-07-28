import { Component, OnInit } from '@angular/core';
import { getUnixTime, startOfQuarter, endOfQuarter, startOfMonth, setMonth, getMonth, endOfMonth } from 'date-fns';
import { DateRangeItemInfo } from 'ngx-tethys';

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
            begin: getUnixTime(startOfQuarter(new Date())),
            end: getUnixTime(endOfQuarter(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        {
            key: 'lastThreeMonths',
            text: '最近三个月',
            begin: getUnixTime(startOfMonth(setMonth(new Date(), getMonth(new Date()) - 2))),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        }
    ];

    constructor() {}

    ngOnInit() {}
}

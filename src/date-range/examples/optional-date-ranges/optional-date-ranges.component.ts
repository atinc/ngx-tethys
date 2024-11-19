import { Component, OnInit, Signal } from '@angular/core';
import { getUnixTime, startOfQuarter, endOfQuarter, startOfMonth, setMonth, getMonth, endOfMonth, addDays, addMonths } from 'date-fns';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { ThyI18nLocale, useLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'app-date-range-optional-date-ranges',
    templateUrl: './optional-date-ranges.component.html'
})
export class ThyDateRangeOptionalDateRangesExampleComponent implements OnInit {
    private locale: Signal<ThyI18nLocale> = useLocale();
    public date: DateRangeItemInfo;

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'season',
            text: this.locale().id.includes('zh') ? '本季度' : 'This Quarter',
            begin: getUnixTime(startOfQuarter(new Date())),
            end: getUnixTime(endOfQuarter(new Date())),
            timestamp: {
                interval: 3,
                unit: 'month'
            }
        },
        // 当前选中时间段为 [今天往前两个月 ~ 今天]，开始时间可能不是1号
        {
            key: 'lastTwoMonths',
            text: this.locale().id.includes('zh') ? '最近两个月' : 'Last two months',
            begin: getUnixTime(addDays(addMonths(new Date(), -2), +1)),
            end: getUnixTime(new Date()),
            timestamp: {
                interval: 2,
                unit: 'month'
            }
        },
        // 当前选中时间段为 [当月月底往前三个月 ~ 当月月底最后1天]，开始时间始终是1号
        {
            key: 'lastThreeMonths',
            text: this.locale().id.includes('zh') ? '最近三个月' : 'Last three months',
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

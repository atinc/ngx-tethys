import { Component, OnInit, Signal } from '@angular/core';
import { endOfMonth, getUnixTime, startOfMonth } from 'ngx-tethys/util';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { injectLocale, ThyDateRangeLocale } from 'ngx-tethys/i18n';

@Component({
    selector: 'app-date-range-custom-time-display-example',
    templateUrl: './custom-time-display.component.html'
})
export class ThyDateRangeCustomTimeDisplayExampleComponent implements OnInit {
    private locale: Signal<ThyDateRangeLocale> = injectLocale('dateRange');
    public date: DateRangeItemInfo;

    public customKey = 'exception';

    public pickerFormat = 'yyyy-MM';

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: this.locale().currentMonth,
            begin: getUnixTime(startOfMonth(new Date())),
            end: getUnixTime(endOfMonth(new Date())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];
    constructor() {}

    ngOnInit() {}
}

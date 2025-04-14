import { Component, OnInit, Signal } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { injectLocale, ThyDateRangeLocale } from 'ngx-tethys/i18n';
import { endOfMonth, getUnixTime, startOfMonth, TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-custom-time-display-example',
    templateUrl: './custom-time-display.component.html',
    imports: [ThyDateRange, FormsModule]
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
            begin: getUnixTime(startOfMonth(new TinyDate().getTime())),
            end: getUnixTime(endOfMonth(new TinyDate().getTime())),
            timestamp: {
                interval: 1,
                unit: 'month'
            }
        }
    ];
    constructor() {}

    ngOnInit() {}
}

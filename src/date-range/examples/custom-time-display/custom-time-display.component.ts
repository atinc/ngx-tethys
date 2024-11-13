import { Component, inject, OnInit } from '@angular/core';
import { endOfMonth, getUnixTime, startOfMonth } from 'ngx-tethys/util';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { ThyI18nService } from 'ngx-tethys/i18n';

@Component({
    selector: 'app-date-range-custom-time-display-example',
    templateUrl: './custom-time-display.component.html'
})
export class ThyDateRangeCustomTimeDisplayExampleComponent implements OnInit {
    private i18n = inject(ThyI18nService);

    public date: DateRangeItemInfo;

    public customKey = 'exception';

    public pickerFormat = 'yyyy-MM';

    public dateRanges: DateRangeItemInfo[] = [];

    constructor() {}

    ngOnInit() {
        this.dateRanges = [
            {
                key: 'month',
                text: this.i18n.translate('dateRange.thisMonth'),
                begin: getUnixTime(startOfMonth(new Date())),
                end: getUnixTime(endOfMonth(new Date())),
                timestamp: {
                    interval: 1,
                    unit: 'month'
                }
            }
        ];
    }
}

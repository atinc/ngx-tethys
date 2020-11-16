import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, endOfMonth, getUnixTime, startOfMonth } from 'ngx-tethys';

@Component({
    selector: 'app-date-range-custom-time-display-example',
    templateUrl: './custom-time-display.component.html'
})
export class ThyDateRangeCustomTimeDisplayExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    public customKey = 'exception';

    public pickerFormat = 'yyyy年MM月';

    public dateRanges: DateRangeItemInfo[] = [
        {
            key: 'month',
            text: '本月',
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

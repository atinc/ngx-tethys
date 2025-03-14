import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';
import { endOfYear, getUnixTime, startOfYear, TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'app-date-range-min-and-max-date',
    templateUrl: './min-and-max-date.component.html',
    standalone: false
})
export class ThyDateRangeMinAndMaxDateExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    minDate = getUnixTime(startOfYear(new TinyDate()?.nativeDate));

    maxDate = getUnixTime(endOfYear(new TinyDate()?.nativeDate));

    constructor() {}

    ngOnInit() {}
}

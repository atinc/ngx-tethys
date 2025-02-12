import { Component, OnInit } from '@angular/core';
import { getUnixTime, startOfYear, endOfYear } from 'date-fns';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'app-date-range-min-and-max-date',
    templateUrl: './min-and-max-date.component.html',
    standalone: false
})
export class ThyDateRangeMinAndMaxDateExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    minDate = getUnixTime(startOfYear(new Date()));

    maxDate = getUnixTime(endOfYear(new Date()));

    constructor() {}

    ngOnInit() {}
}

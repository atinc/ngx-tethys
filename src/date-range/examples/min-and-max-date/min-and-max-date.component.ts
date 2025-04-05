import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { endOfYear, getUnixTime, startOfYear, TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-min-and-max-date',
    templateUrl: './min-and-max-date.component.html',
    imports: [ThyDateRange, FormsModule]
})
export class ThyDateRangeMinAndMaxDateExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    minDate = getUnixTime(startOfYear(new TinyDate()?.nativeDate));

    maxDate = getUnixTime(endOfYear(new TinyDate()?.nativeDate));

    constructor() {}

    ngOnInit() {}
}

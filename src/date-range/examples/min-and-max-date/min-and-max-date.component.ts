import { Component, OnInit } from '@angular/core';
import { getUnixTime, startOfYear, endOfYear } from 'date-fns';

@Component({
    selector: 'app-date-range-min-and-max-date',
    templateUrl: './min-and-max-date.component.html'
})
export class ThyDateRangeMinAndMaxDateExampleComponent implements OnInit {
    minDate = getUnixTime(startOfYear(new Date()));

    maxDate = getUnixTime(endOfYear(new Date()));

    constructor() {}

    ngOnInit() {}
}

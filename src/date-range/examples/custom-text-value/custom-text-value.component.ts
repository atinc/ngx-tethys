import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'app-date-range-custom-text-value',
    templateUrl: './custom-text-value.component.html',
    standalone: false
})
export class ThyDateRangeCustomTextValueExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

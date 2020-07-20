import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys';

@Component({
    selector: 'app-date-range-custom-text-value',
    templateUrl: './custom-text-value.component.html'
})
export class ThyDateRangeCustomTextValueExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

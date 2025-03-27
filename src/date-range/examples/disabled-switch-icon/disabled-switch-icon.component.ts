import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'app-date-range-disabled-switch-icon-example',
    templateUrl: './disabled-switch-icon.component.html',
    standalone: false
})
export class ThyDateRangeDisabledSwitchIconExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

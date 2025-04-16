import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-disabled-switch-icon-example',
    templateUrl: './disabled-switch-icon.component.html',
    imports: [ThyDateRange, FormsModule]
})
export class ThyDateRangeDisabledSwitchIconExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

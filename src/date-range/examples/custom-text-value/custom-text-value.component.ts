import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-custom-text-value',
    templateUrl: './custom-text-value.component.html',
    imports: [ThyDateRange, FormsModule]
})
export class ThyDateRangeCustomTextValueExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

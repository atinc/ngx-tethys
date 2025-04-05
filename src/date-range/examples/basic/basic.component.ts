import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyDateRange, FormsModule]
})
export class ThyDateRangeBasicExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}

    changeDate(date: DateRangeItemInfo) {
        console.log(date);
    }
}

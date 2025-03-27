import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'app-date-range-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
})
export class ThyDateRangeBasicExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}

    changeDate(date: DateRangeItemInfo) {
        console.log(date);
    }
}

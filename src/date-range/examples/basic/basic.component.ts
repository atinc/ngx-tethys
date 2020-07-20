import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys';

@Component({
    selector: 'app-date-range-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyDateRangeBasicExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}

    changeDate() {}
}

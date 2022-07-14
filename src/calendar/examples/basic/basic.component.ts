import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'thy-calendar-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyCalendarBasicExampleComponent implements OnInit {
    date = new Date();

    constructor() {}

    ngOnInit() {}

    onValueChange(e: Date) {}
}

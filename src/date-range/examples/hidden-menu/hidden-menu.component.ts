import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys/date-range';

@Component({
    selector: 'app-date-range-hidden-menu-example',
    templateUrl: './hidden-menu.component.html',
    standalone: false
})
export class ThyDateRangeHiddenMenuExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

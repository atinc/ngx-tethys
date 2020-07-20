import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo } from 'ngx-tethys';

@Component({
    selector: 'app-date-range-hidden-menu-example',
    templateUrl: './hidden-menu.component.html'
})
export class ThyDateRangeHiddenMenuExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { DateRangeItemInfo, ThyDateRange } from 'ngx-tethys/date-range';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-date-range-hidden-menu-example',
    templateUrl: './hidden-menu.component.html',
    imports: [ThyDateRange, FormsModule]
})
export class ThyDateRangeHiddenMenuExampleComponent implements OnInit {
    public date: DateRangeItemInfo;

    constructor() {}

    ngOnInit() {}
}

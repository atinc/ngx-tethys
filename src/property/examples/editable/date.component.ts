import { Component, OnInit, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-property-editable-date-inner',
    template: `
        <thy-date-picker
            thyShowTime
            [thyFormat]="'yyyy-MM-dd HH:mm'"
            thyPlaceHolder="选择时间"
            [(ngModel)]="user().birth_date"
            thySize="md"></thy-date-picker>
    `,
    imports: [ThyDatePicker, FormsModule]
})
export class ThyPropertyEditableDateInnerComponent implements OnInit {
    readonly user = input<{ birth_date: number }>();

    constructor() {}

    ngOnInit() {}
}

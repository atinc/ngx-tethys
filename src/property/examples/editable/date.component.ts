import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'thy-property-editable-date-inner',
    template: `
        <thy-date-picker
            thyShowTime
            [thyFormat]="'yyyy-MM-dd HH:mm'"
            thyPlaceHolder="选择时间"
            [(ngModel)]="user.birth_date"
            thySize="md"></thy-date-picker>
    `,
    standalone: false
})
export class ThyPropertyEditableDateInnerComponent implements OnInit {
    @Input() user: { birth_date: number };

    constructor() {}

    ngOnInit() {}
}

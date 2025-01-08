import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-format-example',
    templateUrl: './format.component.html'
})
export class ThyDatePickerFormatExampleComponent implements OnInit {
    monthFormat = 'yyyy/MM';
    date = new TinyDate()?.nativeDate;

    formatTypes = ['yyyy/MM/dd', 'yyyy-MM-dd'];

    monthFormatTypes = ['yyyy/MM', 'yyyy-MM'];

    currentFormat = 'yyyy/MM/dd';

    constructor() {}

    ngOnInit() {}
}

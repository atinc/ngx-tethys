import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-format',
    templateUrl: './datepicker-format.component.html'
})
export class DemoDatePickerFormatComponent {
    dateFormat = 'yyyy/MM/dd';
    monthFormat = 'yyyy/MM';
    date = null;
}

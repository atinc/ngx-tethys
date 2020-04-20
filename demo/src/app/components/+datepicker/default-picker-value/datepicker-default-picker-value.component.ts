import { Component } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-default-picker-value',
    templateUrl: './datepicker-default-picker-value.component.html'
})
export class DemoDatePickerDefaultPickerValueComponent {
    today = new Date();

    defaultPickerValue = new Date('2022-03-03');

    defaultRangePickerValue = [new Date('2022-03-03'), new Date('2022-04-04')];
}

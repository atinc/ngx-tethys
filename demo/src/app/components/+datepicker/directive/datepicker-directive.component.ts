import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-directive',
    templateUrl: './datepicker-directive.component.html'
})
export class DemoDatePickerDirectiveComponent {
    date = new Date();

    time = {
        date: 1234567890,
        with_time: 1
    };

    dateTime = {
        date: 1253498754,
        with_time: 0
    };
    dateRange = [];

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

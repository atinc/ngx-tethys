import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-time',
    templateUrl: './datepicker-time.component.html'
})
export class DemoDatePickerTimeComponent {
    dateTime: {
        date: null;
        with_time: 0;
    };

    onChange(result: Date): void {
        console.log('Selected Time: ', result);
    }
}

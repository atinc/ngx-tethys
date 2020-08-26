import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-time-example',
    templateUrl: './time.component.html'
})
export class ThyDatePickerTimeExampleComponent implements OnInit {
    dateTime = {
        date: '',
        with_time: 1
    };

    constructor() {}

    ngOnInit() {}

    onChange(result: Date): void {
        console.log('Selected Time: ', result);
        console.log(this.dateTime);
    }
}

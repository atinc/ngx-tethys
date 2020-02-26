import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-basic',
    templateUrl: './datepicker-basic.component.html'
})
export class DemoDatePickerBasicComponent {
    date = { date: new Date(), with_time: 0 };
    dateRange = { begin: new Date(), end: new Date() };

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

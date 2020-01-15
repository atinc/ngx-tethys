import { Component, OnInit } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';

@Component({
    selector: 'app-demo-datepicker-disabled-date',
    templateUrl: './datepicker-disabled-date.component.html'
})
export class DemoDatePickerDisabledDateComponent {
    today = new Date();

    minDate = new Date('2020-01-11');

    maxDate = new Date('2020-02-22');
}

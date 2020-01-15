import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-readonly',
    templateUrl: './datepicker-readonly.component.html'
})
export class DemoDatePickerReadonlyComponent {
    date = new Date();
    dateRange = {
        begin: 1434567890,
        end: 1534567890
    };
}

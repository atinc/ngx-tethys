import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-demo-datepicker-size',
    templateUrl: './datepicker-size.component.html'
})
export class DemoDatePickerSizeComponent {
    currentSize = 'default';
    btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];
}

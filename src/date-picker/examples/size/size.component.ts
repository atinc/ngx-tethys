import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-date-picker-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyDatePickerSizeExampleComponent implements OnInit {
    currentSize = 'default';
    btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyTimePickerDisabledExampleComponent implements OnInit {
    date: Date = new Date();

    constructor() {}

    ngOnInit() {}
}

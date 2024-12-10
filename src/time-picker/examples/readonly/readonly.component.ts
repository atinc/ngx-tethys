import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-readonly-example',
    templateUrl: './readonly.component.html',
    standalone: false
})
export class ThyTimePickerReadonlyExampleComponent implements OnInit {
    date: Date = new Date();

    constructor() {}

    ngOnInit() {}
}

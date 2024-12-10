import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-time-picker-format-example',
    templateUrl: './format.component.html',
    standalone: false
})
export class ThyTimePickerFormatExampleComponent implements OnInit {
    formats: string[] = ['HH:mm:ss', 'HH:mm', 'mm:ss'];

    format: string = 'HH:mm:ss';

    date: Date = new Date();

    constructor() {}

    ngOnInit() {}
}

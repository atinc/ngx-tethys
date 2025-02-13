import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-format-example',
    templateUrl: './format.component.html'
})
export class ThyTimePickerFormatExampleComponent implements OnInit {
    formats: string[] = ['HH:mm:ss', 'HH:mm', 'mm:ss'];

    format: string = 'HH:mm:ss';

    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

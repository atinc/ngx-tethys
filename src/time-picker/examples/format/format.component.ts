import { Component, OnInit } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';


@Component({
    selector: 'thy-time-picker-format-example',
    templateUrl: './format.component.html',
    imports: [ThyTimePicker, FormsModule, ThyButtonGroup, ThyButton]
})
export class ThyTimePickerFormatExampleComponent implements OnInit {
    formats: string[] = ['HH:mm:ss', 'HH:mm', 'mm:ss'];

    format: string = 'HH:mm:ss';

    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-time-picker-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerBasicExampleComponent implements OnInit {
    fullTime: Date;

    time: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}

    onChange(e: Date) {
        console.log(e);
    }
}

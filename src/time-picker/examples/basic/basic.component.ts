import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-basic-example',
    templateUrl: './basic.component.html',
    standalone: false
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

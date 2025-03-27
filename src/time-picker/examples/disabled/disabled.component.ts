import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyTimePickerDisabledExampleComponent implements OnInit {
    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

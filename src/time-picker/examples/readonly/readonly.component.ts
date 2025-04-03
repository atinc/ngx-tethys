import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-readonly-example',
    templateUrl: './readonly.component.html'
})
export class ThyTimePickerReadonlyExampleComponent implements OnInit {
    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

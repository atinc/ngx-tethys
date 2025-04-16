import { Component, OnInit } from '@angular/core';
import { TinyDate } from 'ngx-tethys/util';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-time-picker-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyTimePicker, FormsModule, ThySpace, ThySpaceItemDirective]
})
export class ThyTimePickerDisabledExampleComponent implements OnInit {
    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

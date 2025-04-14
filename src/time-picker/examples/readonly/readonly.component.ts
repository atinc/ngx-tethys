import { Component, OnInit } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';
import { FormsModule } from '@angular/forms';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';

@Component({
    selector: 'thy-time-picker-readonly-example',
    templateUrl: './readonly.component.html',
    imports: [ThyTimePicker, FormsModule, ThySpace, ThySpaceItemDirective]
})
export class ThyTimePickerReadonlyExampleComponent implements OnInit {
    date: Date = new TinyDate()?.nativeDate;

    constructor() {}

    ngOnInit() {}
}

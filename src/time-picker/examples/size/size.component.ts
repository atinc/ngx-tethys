import { Component, OnInit } from '@angular/core';
import { ThyTimePicker, TimePickerSize } from 'ngx-tethys/time-picker';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-time-picker-size-example',
    templateUrl: './size.component.html',
    imports: [ThyTimePicker, ThyButtonGroup, ThyButton, NgClass, FormsModule]
})
export class ThyTimePickerSizeExampleComponent implements OnInit {
    date: Date;

    sizes: {
        name: TimePickerSize;
        height: number;
    }[] = [
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: '',
            height: 36
        },
        {
            name: 'lg',
            height: 44
        }
    ];

    size: TimePickerSize = '';

    constructor() {}

    ngOnInit() {}
}

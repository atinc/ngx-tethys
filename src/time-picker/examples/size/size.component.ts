import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-size-example',
    templateUrl: './size.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, ThyButtonGroup, ThyButton, NgClass, FormsModule]
})
export class ThyTimePickerSizeExampleComponent {
    date: Date = new TinyDate()?.nativeDate;

    sizes = [
        {
            name: 'sm',
            height: 28
        },
        {
            name: 'md',
            height: 32
        },
        {
            name: 'lg',
            height: 36
        }
    ];

    size: string = 'lg';
}

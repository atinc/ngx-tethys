import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-format-example',
    templateUrl: './format.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTimePickerFormatExampleComponent {
    formats: string[] = ['HH:mm:ss', 'HH:mm', 'mm:ss'];

    format: string = 'HH:mm:ss';

    date: Date = new TinyDate()?.nativeDate;
}

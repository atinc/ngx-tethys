import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { FormsModule } from '@angular/forms';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-step-example',
    templateUrl: './step.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerStepExampleComponent {
    date: Date = new TinyDate()?.nativeDate;
}

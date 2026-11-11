import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-readonly-example',
    templateUrl: './readonly.component.html',
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerReadonlyExampleComponent {
    date: Date = new TinyDate()?.nativeDate;
}

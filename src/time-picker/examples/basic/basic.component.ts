import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerBasicExampleComponent {
    date: Date = new TinyDate()?.nativeDate;

    onChange(e: Date) {
        console.log(e);
    }
}

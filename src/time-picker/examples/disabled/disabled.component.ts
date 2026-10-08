import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule]
})
export class ThyTimePickerDisabledExampleComponent {
    date: Date = new TinyDate()?.nativeDate;

    onChange(event: Date) {
        console.log(event);
    }
}

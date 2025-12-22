import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-show-time-example',
    templateUrl: './show-time.component.html',
    imports: [ThyDatePicker, FormsModule]
})
export class ThyDatePickerShowTimeExampleComponent {
    date = { date: new TinyDate().getTime(), with_time: 0 };

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

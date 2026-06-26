import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyRangePicker } from 'ngx-tethys/date-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-date-picker-separator-example',
    templateUrl: './separator.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRangePicker, FormsModule]
})
export class ThyDatePickerSeparatorExampleComponent {
    dateRange = { begin: new TinyDate().getTime(), end: new TinyDate().getTime() };

    separator = '/';

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

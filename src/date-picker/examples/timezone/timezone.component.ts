import { Component, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker } from 'ngx-tethys/date-picker';
import { SafeAny } from 'ngx-tethys/types';

@Component({
    selector: 'thy-date-picker-timezone-example',
    templateUrl: './timezone.component.html',
    imports: [ThyDatePicker, FormsModule]
})
export class ThyDatePickerTimezoneExampleComponent {
    date = '2026/02/06 15:00:00';
    date1 = '2026-02-06';
    date2 = '2026年02月06日 15时00分'; // 中文格式
    date3 = 'Feb 6, 2026 15:00'; // 英文格式
    date4 = '2026-02-06T15:00:00'; // ISO 格式
    date5 = 1770418800;

    dateArray: Signal<SafeAny[]> = signal([this.date, this.date1, this.date2, this.date3, this.date4, this.date5]);

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';

@Component({
    selector: 'thy-date-picker-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-date-picker {
                display: block;
                width: 240px;
            }

            thy-range-picker {
                display: block;
                width: 320px;
            }
        `
    ],
    imports: [ThyDatePicker, ThyRangePicker, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyDatePickerAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    date: Date | null = null;

    dateRange: Date[] = [];
}

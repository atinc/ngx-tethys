import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyDatePicker, ThyRangePicker } from 'ngx-tethys/date-picker';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';

@Component({
    selector: 'thy-date-picker-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-date-picker,
            thy-range-picker {
                width: 100%;
                display: block;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyDatePicker, ThyRangePicker, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThyDatePickerAppearanceExampleComponent {
    date: Date | null = null;

    dateRange: Date[] = [];
}

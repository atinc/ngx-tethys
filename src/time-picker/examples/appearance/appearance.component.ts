import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyTimePicker } from 'ngx-tethys/time-picker';

@Component({
    selector: 'thy-time-picker-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-time-picker {
                width: 100%;
                display: block;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThyTimePickerAppearanceExampleComponent {
    date: Date | null = null;
}

import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyTimePicker } from 'ngx-tethys/time-picker';
import { TinyDate } from 'ngx-tethys/util';

@Component({
    selector: 'thy-time-picker-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTimePicker, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTimePickerAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    date: Date = new TinyDate()?.nativeDate;
}

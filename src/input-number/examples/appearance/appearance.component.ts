import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyInputNumber } from 'ngx-tethys/input-number';

@Component({
    selector: 'thy-input-number-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputNumber, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyInputNumberAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    value = 0;
}

import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyInput, ThyInputDirective } from 'ngx-tethys/input';

@Component({
    selector: 'thy-input-appearance-example',
    templateUrl: './appearance.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyInputDirective, ThyInput, FormsModule, ThyButtonGroup, NgClass, ThyButton, ThyRowDirective, ThyColDirective]
})
export class ThyInputAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    value = '';
}

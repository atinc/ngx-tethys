import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-select {
                display: block;
                width: 240px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThySelectAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    listOfOption = listOfOption;

    value = '';
}

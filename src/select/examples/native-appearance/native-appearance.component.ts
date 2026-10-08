import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyNativeSelect } from 'ngx-tethys/select';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-native-select-appearance-example',
    templateUrl: './native-appearance.component.html',
    styles: [
        `
            thy-native-select {
                display: block;
                width: 240px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNativeSelect, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyNativeSelectAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    listOfOption = listOfOption;

    value = '';
}

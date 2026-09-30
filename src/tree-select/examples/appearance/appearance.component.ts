import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-tree-select {
                display: block;
                width: 240px;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTreeSelect, FormsModule, ThyButtonGroup, NgClass, ThyButton]
})
export class ThyTreeSelectAppearanceExampleComponent {
    appearances: ThyFormControlAppearance[] = ['outline', 'fill', 'subtle', 'ghost'];

    appearance: ThyFormControlAppearance = 'outline';

    treeSelectNodes = basicTreeSelectData;

    selectedValue = '';
}

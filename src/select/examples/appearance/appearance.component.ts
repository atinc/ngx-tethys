import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyFormControlAppearance } from 'ngx-tethys/core';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-select {
                width: 100%;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyOption, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThySelectAppearanceExampleComponent {
    listOfOption = listOfOption;

    value = 'option1';

    appearances: { value: ThyFormControlAppearance; label: string }[] = [
        { value: 'outline', label: 'outline：灰色边框，hover/focus 蓝色边框' },
        { value: 'subtle', label: 'subtle：无边框，hover/focus 蓝色边框' },
        { value: 'ghost', label: 'ghost：无边框，hover/focus 也无边框' }
    ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyColDirective, ThyRowDirective } from 'ngx-tethys/grid';
import { ThyNativeSelect, ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { listOfOption } from '../mock-data';

@Component({
    selector: 'thy-select-appearance-example',
    templateUrl: './appearance.component.html',
    styles: [
        `
            thy-select,
            thy-native-select {
                width: 100%;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThySelect, ThyNativeSelect, ThyOption, FormsModule, ThyColDirective, ThyRowDirective]
})
export class ThySelectAppearanceExampleComponent {
    listOfOption = listOfOption;

    value = '';
}

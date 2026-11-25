import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox, ThyCheckboxGroup, ThyCheckboxOption } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-group-example',
    templateUrl: './group.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox, ThyCheckboxGroup, FormsModule]
})
export class ThyCheckboxGroupExampleComponent {
    inlineStatus = false;

    values: Array<string | number> = ['Apple'];

    options: ThyCheckboxOption[] = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true }
    ];
}

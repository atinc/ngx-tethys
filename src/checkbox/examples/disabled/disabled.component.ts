import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox, ThyCheckboxGroup, ThyCheckboxOption } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-disabled-example',
    templateUrl: './disabled.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox, ThyCheckboxGroup, FormsModule]
})
export class ThyCheckboxDisabledExampleComponent {
    values: Array<string | number> = ['apple'];

    groupValues: Array<string | number> = [];

    disabledOptions: ThyCheckboxOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana', disabled: true }
    ];

    allDisabledOptions: ThyCheckboxOption[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Orange', value: 'orange' }
    ];
}

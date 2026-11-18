import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyRadioGroup, ThyRadioOption } from 'ngx-tethys/radio';

@Component({
    selector: 'app-radio-group-options-example',
    templateUrl: './group-options.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyRadioGroup, ThyCheckbox, FormsModule]
})
export class ThyRadioGroupOptionsExampleComponent {
    checkedValue: string | number | boolean = 'Apple';

    inlineStatus = false;

    options: ThyRadioOption[] = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: true }
    ];
}

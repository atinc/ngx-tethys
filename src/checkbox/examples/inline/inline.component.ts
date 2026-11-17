import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox, ThyCheckboxGroup, ThyCheckboxOption } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-inline-example',
    templateUrl: './inline.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox, ThyCheckboxGroup, FormsModule]
})
export class ThyCheckboxInlineExampleComponent {
    public inlineStatus = true;

    public values: Array<string | number> = ['dog'];

    public options: ThyCheckboxOption[] = [
        { label: 'Dog 🐶', value: 'dog' },
        { label: 'Cat 🐱', value: 'cat' },
        { label: 'Rabbit 🐰', value: 'rabbit' }
    ];
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyCheckbox, ThyCheckboxGroup, ThyCheckboxOption } from 'ngx-tethys/checkbox';

@Component({
    selector: 'thy-checkbox-indeterminate-example',
    templateUrl: './indeterminate.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyCheckbox, ThyCheckboxGroup, FormsModule]
})
export class ThyCheckboxIndeterminateExampleComponent {
    options: ThyCheckboxOption[] = [
        { label: 'Dog 🐶', value: 'dog' },
        { label: 'Cat 🐱', value: 'cat' },
        { label: 'Rabbit 🐰', value: 'rabbit' }
    ];

    values: Array<string | number | boolean> = ['dog'];

    checkedAll = false;

    indeterminate = true;

    select(values: Array<string | number | boolean>) {
        const total = this.options.length;
        const checkedCount = values.length;
        this.checkedAll = checkedCount === total;
        this.indeterminate = checkedCount > 0 && checkedCount < total;
    }

    selectAll(checked: boolean) {
        this.values = checked ? this.options.map(option => option.value) : [];
        this.indeterminate = false;
        this.checkedAll = checked;
    }
}

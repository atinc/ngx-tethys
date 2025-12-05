import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCheckbox } from 'ngx-tethys/checkbox';

@Component({
    selector: 'th[thyChecked],th[thyShowCheckbox]',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label
            thyCheckbox
            [ngModel]="thyChecked()"
            [thyDisabled]="thyDisabled()"
            [thyIndeterminate]="thyIndeterminate()"
            (ngModelChange)="onCheckedChange($event)"></label>
    `,
    host: {
        '[class.thy-native-table-selection-column]': 'thyShowCheckbox()'
    },
    imports: [FormsModule, ThyCheckbox]
})
export class ThyNativeTableThSelectionComponent<T> implements OnInit {
    readonly thyShowCheckbox = input(true, { transform: booleanAttribute });

    readonly thyDisabled = input(false, { transform: booleanAttribute });

    readonly thyChecked = input(false, { transform: booleanAttribute });

    readonly thyIndeterminate = input(false, { transform: booleanAttribute });

    readonly thyCheckedChange = output<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onCheckedChange(checked: boolean): void {
        this.thyCheckedChange.emit(checked);
    }
}

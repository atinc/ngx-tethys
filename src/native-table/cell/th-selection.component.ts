import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCheckbox } from 'ngx-tethys/checkbox';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'th[thyHeaderCellChecked],th[thyHeaderCellCheckbox]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label
            thyCheckbox
            [ngModel]="thyHeaderCellChecked()"
            [thyDisabled]="thyDisabled()"
            [thyIndeterminate]="thyIndeterminate()"
            (ngModelChange)="onCheckedChange($event)"></label>
    `,
    host: {
        '[class.thy-native-table-selection-column]': 'thyHeaderCellCheckbox()'
    },
    imports: [FormsModule, ThyCheckbox]
})
export class ThyNativeTableThSelectionComponent<T> implements OnInit {
    readonly thyHeaderCellCheckbox = input(true, { transform: booleanAttribute });

    readonly thyDisabled = input(false, { transform: booleanAttribute });

    readonly thyHeaderCellChecked = input(false, { transform: booleanAttribute });

    readonly thyIndeterminate = input(false, { transform: booleanAttribute });

    readonly thyCheckedChange = output<boolean>();

    constructor() {}

    ngOnInit(): void {}

    onCheckedChange(checked: boolean): void {
        this.thyCheckedChange.emit(checked);
    }
}

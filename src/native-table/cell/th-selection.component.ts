import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input, output, OnInit, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCheckbox } from 'ngx-tethys/checkbox';
import { ThyNativeTableHeaderCellCheckState } from '../table.interface';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'th[thyHeaderCell="checkbox"]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label
            thyCheckbox
            [ngModel]="checked()"
            [thyDisabled]="thyDisabled()"
            [thyIndeterminate]="indeterminate()"
            (ngModelChange)="onCheckedChange($event)"></label>
    `,
    host: {},
    imports: [FormsModule, ThyCheckbox]
})
export class ThyNativeTableThSelectionComponent<T> implements OnInit {
    readonly thyDisabled = input(false, { transform: booleanAttribute });

    readonly thyChecked = input<ThyNativeTableHeaderCellCheckState>(false);

    readonly thyCheckedChange = output<boolean>();

    readonly checked = computed(() => {
        if (this.thyChecked() === 'indeterminate') {
            return false;
        }
        return this.thyChecked();
    });

    indeterminate = computed(() => this.thyChecked() === 'indeterminate');

    constructor() {}

    ngOnInit(): void {}

    onCheckedChange(checked: boolean): void {
        this.thyCheckedChange.emit(checked);
    }
}

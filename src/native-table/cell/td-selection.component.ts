import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input, output, OnInit, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCheckbox } from 'ngx-tethys/checkbox';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'td[thyCellChecked],td[thyCellCheckbox]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label
            thyCheckbox
            [ngModel]="thyCellChecked()"
            [disabled]="thyDisabled()"
            [thyIndeterminate]="thyIndeterminate()"
            (ngModelChange)="onCheckedChange($event)"></label>
        <ng-content></ng-content>
    `,
    host: {
        '[class.thy-native-table-selection-column]': 'thyCellCheckbox()'
    },
    imports: [FormsModule, ThyCheckbox]
})
export class ThyNativeTableTdSelectionComponent<T> implements OnInit {
    readonly thyDisabled = input(false, { transform: booleanAttribute });
    readonly thyCellCheckbox = input(false, { transform: booleanAttribute });
    readonly thyCellChecked = input(false, { transform: booleanAttribute });
    readonly thyIndeterminate = input(false, { transform: booleanAttribute });

    readonly thyCheckedChange = output<boolean>();

    ngOnInit(): void {}

    onCheckedChange(checked: boolean): void {
        this.thyCheckedChange.emit(checked);
    }
}

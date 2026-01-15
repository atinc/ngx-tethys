import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input, output, OnInit, DestroyRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThyCheckbox } from 'ngx-tethys/checkbox';

/* eslint-disable @angular-eslint/component-selector */
@Component({
    selector: 'td[thyCell="checkbox"]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <label thyCheckbox [ngModel]="thyChecked()" [disabled]="thyDisabled()" (ngModelChange)="onCheckedChange($event)"></label>
        <ng-content></ng-content>
    `,
    host: {},
    imports: [FormsModule, ThyCheckbox]
})
export class ThyNativeTableTdSelectionComponent<T> implements OnInit {
    readonly thyDisabled = input(false, { transform: booleanAttribute });

    readonly thyChecked = input(false, { transform: booleanAttribute });

    readonly thyCheckedChange = output<boolean>();

    ngOnInit(): void {}

    onCheckedChange(checked: boolean): void {
        this.thyCheckedChange.emit(checked);
    }
}

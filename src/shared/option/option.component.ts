import { Component, input, TemplateRef, ChangeDetectionStrategy, viewChild, inject } from '@angular/core';
import { ThySelectOptionGroup } from './group/option-group.component';

@Component({
    selector: 'thy-option',
    template: `
        <ng-template>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOption {
    readonly thyValue = input<any>();

    readonly thyRawValue = input<any>();

    readonly thyLabelText = input<string>();

    readonly thyShowOptionCustom = input<boolean>();

    readonly thySearchKey = input<string>();

    readonly thyDisabled = input<boolean>();

    readonly template = viewChild<TemplateRef<any>>(TemplateRef);

    private readonly optionGroupComponent = inject(ThySelectOptionGroup, { optional: true });

    get groupLabel() {
        return this.optionGroupComponent?.thyGroupLabel() || '';
    }
}

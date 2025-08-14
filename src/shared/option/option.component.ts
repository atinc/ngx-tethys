import { Component, input, TemplateRef, ChangeDetectionStrategy, viewChild } from '@angular/core';

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
}

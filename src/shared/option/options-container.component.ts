import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, viewChild } from '@angular/core';

@Component({
    selector: 'thy-options-container',
    template: `
        <ng-template #options>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyOptionsContainer implements OnInit {
    readonly optionsTemplate = viewChild<TemplateRef<any>>('options');

    constructor() {}

    ngOnInit(): void {}
}

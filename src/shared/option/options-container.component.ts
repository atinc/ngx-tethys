import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'thy-options-container',
    template: `
        <ng-template #options>
            <ng-content></ng-content>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class ThyOptionsContainer implements OnInit {
    @ViewChild('options') optionsTemplate: TemplateRef<any>;

    constructor() {}

    ngOnInit(): void {}
}

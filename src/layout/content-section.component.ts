import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'thy-content-section',
    preserveWhitespaces: false,
    template: `
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-layout-content-section'
    },
    standalone: true
})
export class ThyContentSectionComponent {}

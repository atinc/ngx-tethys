import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @private
 */
@Component({
    selector: 'thy-content-main',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-layout-content-main'
    },
    standalone: true
})
export class ThyContentMainComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @name thy-content-main
 * @order 45
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

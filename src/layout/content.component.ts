import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @name thy-content
 * @order 15
 */
@Component({
    selector: 'thy-content',
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-layout-content'
    },
    standalone: true
})
export class ThyContentComponent {}

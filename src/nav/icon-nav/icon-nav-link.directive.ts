import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @private
 * @deprecated thyIconNavLink will be removed in v23, please use thy-action
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thyIconNavLink]',
    template: '<ng-content></ng-content>@if (thyIconNavLinkIcon()) {<thy-icon [thyIconName]="thyIconNavLinkIcon()"></thy-icon>}',
    host: {
        '[class.active]': 'thyIconNavLinkActive()',
        '[class.thy-icon-nav-link]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyIcon]
})
export class ThyIconNavLink {
    readonly thyIconNavLinkIcon = input<string>('');

    readonly thyIconNavLinkActive = input(false, { transform: coerceBooleanProperty });
}

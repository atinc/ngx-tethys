import { ChangeDetectionStrategy, Component, effect, HostBinding, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { warnDeprecation } from 'ngx-tethys/util';

type IconNavTypes = 'primary' | 'secondary' | 'individual' | '';

/**
 * @private
 */
@Component({
    selector: 'thy-icon-nav',
    templateUrl: './icon-nav.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyIconNav {
    private hostRenderer = useHostRenderer();

    @HostBinding(`class.thy-icon-nav`) isIconNav = true;

    readonly thyType = input<IconNavTypes>('');

    private updateClasses() {
        this.hostRenderer.updateClass(this.thyType() ? [`thy-icon-nav-${this.thyType()}`] : []);
    }

    constructor() {
        if (typeof ngDevMode === 'undefined' || ngDevMode) {
            warnDeprecation('thy-icon-nav has been deprecated, please use thyAction and thy-space components instead of it');
        }

        effect(() => {
            this.updateClasses();
        });
    }
}

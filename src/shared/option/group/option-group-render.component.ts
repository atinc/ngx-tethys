import { Component, input } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @private
 */
@Component({
    selector: 'thy-option-group-render',
    template: `<span class="group-name text-truncate">{{ thyGroupLabel() }}</span>`,
    host: {
        class: 'thy-option-group-render',
        '[class.disabled]': 'thyDisabled()'
    }
})
export class ThyOptionGroupRender {
    readonly thyGroupLabel = input<string | undefined>(undefined);

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });
}

import { Component, input, WritableSignal, signal } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @private
 */
@Component({
    selector: 'thy-option-group-render',
    template: `<span class="group-name text-truncate">{{ thyGroupLabel() }}</span>`,
    host: {
        class: 'thy-option-group-render',
        '[class.disabled]': 'thyDisabled()',
        '[class.thy-select-option-group-hidden]': 'hidden()'
    }
})
export class ThyOptionGroupRender {
    readonly thyGroupLabel = input<string>(undefined);

    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    // 之前的逻辑：遍历 option.hidden 如果所有 option 禁用，那么 group 禁用
    readonly hidden: WritableSignal<boolean> = signal(false);
}

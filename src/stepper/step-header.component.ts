import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { Component, numberAttribute, input, ChangeDetectionStrategy } from '@angular/core';

/**
 * 步骤条头部组件
 * @name thy-step-header
 * @order 25
 */
@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html',
    imports: [ThyIcon],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'thy-stepper-header' }
})
export class ThyStepHeader {
    readonly label = input<string>();

    readonly icon = input<string>();

    readonly index = input<number, unknown>(undefined, { transform: numberAttribute });

    readonly selected = input(false, { transform: coerceBooleanProperty });

    readonly active = input(false, { transform: coerceBooleanProperty });
}

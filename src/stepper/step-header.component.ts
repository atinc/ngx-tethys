import { ThyIcon } from 'ngx-tethys/icon';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { Component, HostBinding, Input, numberAttribute } from '@angular/core';

/**
 * 步骤条头部组件
 * @name thy-step-header
 * @order 25
 */
@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html',
    standalone: true,
    imports: [ThyIcon]
})
export class ThyStepHeader {
    @Input() label: string;

    @Input() icon: string;

    @Input({ transform: numberAttribute }) index: number;

    @HostBinding('class.thy-stepper-header-selected')
    @Input({ transform: coerceBooleanProperty })
    selected: boolean;

    @Input({ transform: coerceBooleanProperty }) active: boolean;

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;
}

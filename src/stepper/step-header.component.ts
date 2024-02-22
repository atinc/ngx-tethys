import { Component, HostBinding, Input } from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';

/**
 * 步骤条头部组件
 * @name thy-step-header
 * @order 25
 */
@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html',
    standalone: true
})
export class ThyStepHeader {
    @Input() label: string;

    @Input() @InputNumber() index: number;

    @HostBinding('class.thy-stepper-header-selected')
    @Input()
    @InputBoolean()
    selected: boolean;

    @Input() @InputBoolean() active: boolean;

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;
}

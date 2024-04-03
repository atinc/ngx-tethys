import { Component, HostBinding, Input, booleanAttribute, numberAttribute } from '@angular/core';

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

    @Input({ transform: numberAttribute }) index: number;

    @HostBinding('class.thy-stepper-header-selected')
    @Input({ transform: booleanAttribute })
    selected: boolean;

    @Input({ transform: booleanAttribute }) active: boolean;

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;
}

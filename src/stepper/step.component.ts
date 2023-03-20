import { Component, Input, ViewChild, TemplateRef, Inject, InjectionToken, Optional } from '@angular/core';

export interface IThyStepperComponent {
    selected: ThyStepComponent;
}

export const THY_STEPPER_COMPONENT = new InjectionToken<IThyStepperComponent>('THY_STEPPER_COMPONENT');

/**
 * 步骤项组件
 * @name thy-step
 * @order 20
 */
@Component({
    selector: 'thy-step',
    templateUrl: './step.component.html',
    standalone: true
})
export class ThyStepComponent {
    @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

    @Input() label: string;

    /**
     * 步骤条中每个步骤的label文本
     */
    @Input() thyLabel: string;

    constructor(@Optional() @Inject(THY_STEPPER_COMPONENT) public stepper: IThyStepperComponent) {}

    select() {
        this.stepper.selected = this;
    }
}

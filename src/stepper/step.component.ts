import { Component, InjectionToken, Input, TemplateRef, ViewChild, inject } from '@angular/core';

export interface IThyStepperComponent {
    selected: ThyStep;
}

export const THY_STEPPER_COMPONENT = new InjectionToken<IThyStepperComponent>('THY_STEPPER_COMPONENT');

/**
 * 步骤项组件
 * @name thy-step
 * @order 20
 */
@Component({
    selector: 'thy-step',
    templateUrl: './step.component.html'
})
export class ThyStep {
    stepper = inject(THY_STEPPER_COMPONENT, { optional: true })!;

    @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

    @Input() label: string;

    /**
     * 步骤条中每个步骤的label文本
     */
    @Input() thyLabel: string;

    /**
     * 步骤条中每个步骤完成的图标
     * @default check-circle
     */
    @Input() thyIcon: string;

    select() {
        this.stepper.selected = this;
    }
}

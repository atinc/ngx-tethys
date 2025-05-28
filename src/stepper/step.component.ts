import { Component, InjectionToken, TemplateRef, ViewChild, inject, input, WritableSignal, viewChild } from '@angular/core';

export interface IThyStepperComponent {
    updateSelected(step: ThyStep): void;
}

export const THY_STEPPER_COMPONENT = new InjectionToken<IThyStepperComponent>('THY_STEPPER_COMPONENT');

/**
 * 步骤项组件
 * @name thy-step
 * @order 20
 */
@Component({ selector: 'thy-step', templateUrl: './step.component.html' })
export class ThyStep {
    stepper = inject(THY_STEPPER_COMPONENT, { optional: true })!;

    readonly content = viewChild<TemplateRef<any>>(TemplateRef);

    readonly label = input<string>();

    /**
     * 步骤条中每个步骤的label文本
     */
    readonly thyLabel = input<string>();

    /**
     * 步骤条中每个步骤完成的图标
     * @default check-circle
     */
    readonly thyIcon = input<string>();

    select() {
        this.stepper.updateSelected(this);
    }
}

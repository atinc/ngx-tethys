import { Component, Input, ViewChild, TemplateRef, forwardRef, Inject, InjectionToken, Optional } from '@angular/core';

export interface IThyStepperComponent {
    selected: ThyStepComponent;
}

export const THY_STEPPER_COMPONENT = new InjectionToken<IThyStepperComponent>('THY_STEPPER_COMPONENT');

@Component({
    selector: 'thy-step',
    templateUrl: './step.component.html'
})
export class ThyStepComponent {
    @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any>;

    @Input() label: string;

    @Input() thyLabel: string;

    constructor(@Optional() @Inject(THY_STEPPER_COMPONENT) public stepper: IThyStepperComponent) {}

    select() {
        this.stepper.selected = this;
    }
}

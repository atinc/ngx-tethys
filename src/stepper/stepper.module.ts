import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyStepHeader } from './step-header.component';
import { ThyStep } from './step.component';
import { ThyStepper } from './stepper.component';
import { ThyStepperNextDirective, ThyStepperPreviousDirective } from './stepper-button.directive';

@NgModule({
    imports: [CommonModule, ThyStepHeader, ThyStepper, ThyStep, ThyStepperNextDirective, ThyStepperPreviousDirective],
    exports: [ThyStepper, ThyStep, ThyStepHeader, ThyStepperNextDirective, ThyStepperPreviousDirective],
    providers: []
})
export class ThyStepperModule {}

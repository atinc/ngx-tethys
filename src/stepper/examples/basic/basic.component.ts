import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThyStep, ThyStepper, ThyStepperNextDirective, ThyStepperPreviousDirective } from 'ngx-tethys/stepper';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-stepper-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyStepper, ThyStep, ThyButton, ThyStepperNextDirective, ThyStepperPreviousDirective]
})
export class ThyStepperBasicExampleComponent {
    constructor() {}
}

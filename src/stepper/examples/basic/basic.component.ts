import { Component } from '@angular/core';
import { ThyStep, ThyStepper, ThyStepperNextDirective, ThyStepperPreviousDirective } from 'ngx-tethys/stepper';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-stepper-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyStepper, ThyStep, ThyButton, ThyStepperNextDirective, ThyStepperPreviousDirective]
})
export class ThyStepperBasicExampleComponent {
    constructor() {}
}

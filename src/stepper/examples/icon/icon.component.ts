import { Component } from '@angular/core';
import { ThyStep, ThyStepper, ThyStepperNextDirective, ThyStepperPreviousDirective } from 'ngx-tethys/stepper';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-stepper-icon-example',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports: [ThyStepper, ThyStep, ThyButton, ThyStepperNextDirective, ThyStepperPreviousDirective]
})
export class ThyStepperIconExampleComponent {
    constructor() {}
}

import { Component } from '@angular/core';
import { ThyStep, ThyStepper } from 'ngx-tethys/stepper';

@Component({
    selector: 'thy-stepper-icon-example',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    imports: [ThyStepper, ThyStep]
})
export class ThyStepperIconExampleComponent {
    constructor() {}
}

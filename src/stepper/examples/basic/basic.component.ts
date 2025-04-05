import { Component } from '@angular/core';
import { ThyStep, ThyStepper } from 'ngx-tethys/stepper';

@Component({
    selector: 'thy-stepper-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyStepper, ThyStep]
})
export class ThyStepperBasicExampleComponent {
    constructor() {}
}

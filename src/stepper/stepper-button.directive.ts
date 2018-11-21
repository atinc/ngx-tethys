
import { Directive, Input, HostListener } from '@angular/core';
import { ThyStepperComponent } from './stepper.component';

/** Button that moves to the next step in a stepper workflow. */
@Directive({
    selector: '[thyStepperNext]'
})
export class ThyStepperNextDirective {

    constructor(private stepper: ThyStepperComponent) {
    }

    @HostListener('click', ['$event'])
    click($event: any) {
        this.stepper.next();
    }

}

/** Button that moves to the previous step in a stepper workflow. */
@Directive({
    selector: '[thyStepperPrevious]',
})
export class ThyStepperPreviousDirective {

    constructor(private stepper: ThyStepperComponent) {
    }

    @HostListener('click', ['$event'])
    click($event: any) {
        this.stepper.previous();
    }

}
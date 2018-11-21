import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html'
})
export class ThyStepHeaderComponent {

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;

    @Input() label: string;

    @Input() index: number;

    @Input() selected: boolean;

    @Input() active: boolean;

}

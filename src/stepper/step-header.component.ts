import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html'
})
export class ThyStepHeaderComponent {

    @Input() label: string;

    @Input() index: number;

    @HostBinding('class.thy-stepper-header-selected')
    @Input() selected: boolean;

    @Input() active: boolean;

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;

}

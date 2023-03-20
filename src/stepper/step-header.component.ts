import { Component, HostBinding, Input } from '@angular/core';
import { InputBoolean, InputNumber } from 'ngx-tethys/core';

@Component({
    selector: 'thy-step-header',
    templateUrl: './step-header.component.html',
    standalone: true
})
export class ThyStepHeaderComponent {
    @Input() label: string;

    @Input() @InputNumber() index: number;

    @HostBinding('class.thy-stepper-header-selected')
    @Input()
    @InputBoolean()
    selected: boolean;

    @Input() @InputBoolean() active: boolean;

    @HostBinding('class.thy-stepper-header') thyStepHeader = true;
}

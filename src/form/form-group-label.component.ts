import {
    Component,
    HostBinding,
    Optional,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { ThyFormDirective } from './form.directive';
import { inputValueToBoolean } from '../util/helpers';

@Component({
    selector: 'thy-form-group-label',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupLabelComponent {

    public labelRequired: boolean;

    @HostBinding('class.col-sm-2 col-form-label') _isFormGroupLabel = true;

    @Input() thyLabelText: string;

    @Input() thyLabelTranslateKey: string;

    @Input()
    set thyLabelRequired(value: string) {
        this.labelRequired = inputValueToBoolean(value);
    }


    constructor(
        @Optional() thyFormDirective: ThyFormDirective
    ) {

    }
}

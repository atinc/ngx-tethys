import {
    Component,
    HostBinding,
    Optional,
    Input
} from '@angular/core';
import { ThyFormDirective } from './form.directive';

@Component({
    selector: 'thy-form-group',
    templateUrl: './form-group.component.html'
})
export class ThyFormGroupComponent {

    @HostBinding('class.form-group') _isFormGroup = true;

    @Input() thyLabelText: string;

    @Input() thyLabelTranslateKey: string;

    constructor(
        @Optional() thyFormDirective: ThyFormDirective
    ) {

    }
}

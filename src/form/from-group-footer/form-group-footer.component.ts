import {
    Component,
    HostBinding,
    ViewEncapsulation,
    OnInit,
    Optional
} from '@angular/core';
import { ThyFormDirective } from '../form.directive';

@Component({
    selector: 'thy-form-group-footer',
    templateUrl: './form-group-footer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupFooterComponent implements OnInit {

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') isHorizontal = true;

    constructor(
        @Optional() private thyParentForm: ThyFormDirective
    ) {
    }

    ngOnInit() {
        if (this.thyParentForm) {
            this.isHorizontal = this.thyParentForm.isHorizontal;
        }
    }
}

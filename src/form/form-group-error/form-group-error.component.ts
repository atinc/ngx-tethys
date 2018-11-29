import {
    Component,
    HostBinding,
    ViewEncapsulation,
    OnInit,
    Optional,
    Input
} from '@angular/core';
import { ThyFormDirective } from '../form.directive';

@Component({
    selector: 'thy-form-group-error',
    templateUrl: './form-group-error.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupErrorComponent implements OnInit {

    public errors: string[];

    @Input() thyShowFirst = true;

    @Input()
    set thyErrors(errors: string[]) {
        this.errors = errors;
    }

    get thyErrors() {
        const errors = this.errors || this.thyParentForm.validator.errors;
        return errors && errors.length > 0 && this.thyShowFirst ? [errors[0]] : errors;
    }

    @HostBinding('class.form-group')
    get _isFormGroup() {
        return this.thyErrors && this.thyErrors.length > 0;
    }

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

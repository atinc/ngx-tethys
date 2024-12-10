import { Component, HostBinding, ViewEncapsulation, OnInit, Input, inject } from '@angular/core';
import { ThyFormDirective } from '../form.directive';
import { ThyAlert } from 'ngx-tethys/alert';
import { NgClass } from '@angular/common';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * @name thy-form-group-error
 * @order 50
 */
@Component({
    selector: 'thy-form-group-error',
    templateUrl: './form-group-error.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [NgClass, ThyAlert]
})
export class ThyFormGroupError implements OnInit {
    private thyParentForm = inject(ThyFormDirective, { optional: true })!;

    public errors: string[];

    @Input({ transform: coerceBooleanProperty }) thyShowFirst = true;

    /**
     * @type string[]
     */
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

    ngOnInit() {
        if (this.thyParentForm) {
            this.isHorizontal = this.thyParentForm.isHorizontal;
        }
    }
}

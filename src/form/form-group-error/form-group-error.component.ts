import { Component, ViewEncapsulation, OnInit, inject, input, computed } from '@angular/core';
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
    imports: [NgClass, ThyAlert],
    host: {
        '[class.form-group]': 'isFormGroup()',
        '[class.row]': 'isHorizontal'
    }
})
export class ThyFormGroupError implements OnInit {
    private thyParentForm = inject(ThyFormDirective, { optional: true })!;

    readonly thyShowFirst = input(true, { transform: coerceBooleanProperty });

    readonly thyErrors = input<string[]>();

    readonly errors = computed<string[]>(() => {
        const errors = this.thyErrors();
        return errors && errors.length > 0 && this.thyShowFirst() ? [errors[0]] : errors;
    });

    readonly isFormGroup = computed<boolean>(() => {
        const errors = this.errors();
        return errors && errors.length > 0;
    });

    isHorizontal = true;

    ngOnInit() {
        if (this.thyParentForm) {
            this.isHorizontal = this.thyParentForm.isHorizontal;
        }
    }
}

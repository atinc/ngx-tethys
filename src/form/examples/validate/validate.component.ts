import { Component, OnInit } from '@angular/core';
import {
    ThyFormValidatorConfig,
    ThyFormGroup,
    ThyFormGroupError,
    ThyFormGroupFooter,
    ThyFormSubmitDirective,
    ThyFormDirective
} from 'ngx-tethys/form';
import { FormsModule } from '@angular/forms';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThyButton } from 'ngx-tethys/button';
import { ThyFormModule } from 'ngx-tethys/form';

@Component({
    selector: 'thy-form-validate-example',
    templateUrl: './validate.component.html',
    imports: [
        FormsModule,
        ThyFormDirective,
        ThyFormGroup,
        ThyInputDirective,
        ThyFormGroupError,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective,
        ThyFormModule
    ]
})
export class ThyFormValidateExampleComponent implements OnInit {
    model = {
        name: '',
        password: '',
        email: ''
    };

    validateConfig: ThyFormValidatorConfig = {
        validateOn: 'change',
        validationMessages: {
            username: {
                required: 'Username is required'
            },
            password: {
                required: 'Password is required'
            },
            email: {
                required: 'Email is required',
                email: 'Typed email is invalid'
            }
        }
    };

    constructor() {}

    ngOnInit(): void {}

    submit() {}

    reset(form: ThyFormDirective) {
        form.validator.reset();
        this.model = {
            name: '',
            password: '',
            email: ''
        };
    }
}

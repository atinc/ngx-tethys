import { Component, OnInit } from '@angular/core';
import { ThyFormValidatorConfig, ThyFormDirective } from 'ngx-tethys/form';

@Component({
    selector: 'thy-form-validate-example',
    templateUrl: './validate.component.html',
    standalone: false
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

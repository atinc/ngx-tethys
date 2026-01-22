import { Component, signal } from '@angular/core';
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
        ThyFormSubmitDirective
    ]
})
export class ThyFormValidateExampleComponent {
    saving = signal<boolean>(false);

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

    submit() {
        if (this.saving()) {
            return;
        }
        this.saving.set(true);
        setTimeout(() => {
            this.saving.set(false);
        }, 2000);
    }

    reset(form: ThyFormDirective) {
        form.validator.reset();
        this.model = {
            name: '',
            password: '',
            email: ''
        };
    }
}

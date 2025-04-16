import {
    ThyConfirmValidatorDirective,
    ThyFormGroup,
    ThyFormValidatorConfig,
    ThyMaxDirective,
    ThyMinDirective,
    ThyUniqueCheckValidator,
    ThyValidateOn,
    ThyFormGroupFooter,
    ThyFormDirective,
    ThyFormSubmitDirective
} from 'ngx-tethys/form';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ThyInputNumber } from 'ngx-tethys/input-number';
import { ThyInputDirective } from 'ngx-tethys/input';
import { ThySelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-form-validators-example',
    templateUrl: './validators.component.html',
    imports: [
        ThyFormGroup,
        ThySelect,
        FormsModule,
        ThyOption,
        ThyFormDirective,
        ThyInputDirective,
        ThyUniqueCheckValidator,
        ThyInputNumber,
        ThyMaxDirective,
        ThyMinDirective,
        ThyConfirmValidatorDirective,
        ThyFormGroupFooter,
        ThyButton,
        ThyFormSubmitDirective
    ]
})
export class ThyFormValidatorsExampleComponent implements OnInit {
    submitSuccess = false;

    validateOn: ThyValidateOn = 'change';

    loadingDone = true;

    validateConfig: ThyFormValidatorConfig = {
        validateOn: 'change',
        validationMessages: {
            username: {
                required: 'Username is required',
                thyUniqueCheck: 'Username already exists'
            },
            age: {
                required: 'Age is required',
                min: 'Age must greater than {min}',
                max: 'Age must less than or equal to {max}'
            },
            password: {
                required: 'Password is required'
            },
            confirm_password: {
                required: 'Confirm password is required',
                confirm: 'Two passwords are inconsistent'
            }
        }
    };

    model = {
        password: '',
        confirm_password: '',
        username: '',
        age: ''
    };

    constructor() {}

    ngOnInit(): void {}

    save() {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }

    changeValidateOn() {
        this.loadingDone = false;
        this.validateConfig.validateOn = this.validateOn;
        setTimeout(() => {
            this.loadingDone = true;
        }, 0);
    }

    checkUsername = (name: string) => {
        return of(name).pipe(
            map(name => {
                return name === 'peter';
            })
        );
    };
}

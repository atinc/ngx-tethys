import { ThyFormDirective, ThyFormValidatorConfig } from 'ngx-tethys/form';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'thy-form-validators-example',
    templateUrl: './validators.component.html'
})
export class ThyFormValidatorsExampleComponent implements OnInit {
    submitSuccess = false;

    validateConfig: ThyFormValidatorConfig = {
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

    checkUsername = (name: string) => {
        return of(name).pipe(
            map(name => {
                return name === 'peter';
            })
        );
    };
}

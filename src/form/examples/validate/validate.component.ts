import { Component, OnInit } from '@angular/core';
import { ThyFormValidatorConfig, ThyFormDirective } from 'ngx-tethys';

@Component({
    selector: 'thy-form-validate-example',
    templateUrl: './validate.component.html'
})
export class ThyFormValidateExampleComponent implements OnInit {
    model = {
        name: '',
        password: '',
        email: ''
    };

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空'
            },
            password: {
                required: '密码不能为空'
            },
            email: {
                required: '密码不能为空',
                email: '恩，你输入的邮箱格式不正确'
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

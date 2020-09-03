import { Component, OnInit } from '@angular/core';
import { ThyFormValidatorConfig } from 'ngx-tethys';

@Component({
    selector: 'thy-form-confirm-example',
    templateUrl: './confirm.component.html'
})
export class ThyFormConfirmExampleComponent implements OnInit {
    model = {
        password: '',
        confirm: ''
    };

    validateConfig: ThyFormValidatorConfig = {
        validationMessages: {
            passowrd: {
                required: '密码不能为空'
            },
            confirm: {
                required: '新密码不能为空',
                confirm: '两次输入密码不一致'
            }
        }
    };

    constructor() {}

    ngOnInit(): void {}

    submit() {}

    confirmPassword() {}
}

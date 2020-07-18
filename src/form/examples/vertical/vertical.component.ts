import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { provinceCities } from '../constants';

@Component({
    selector: 'thy-form-vertical-example',
    templateUrl: './vertical.component.html'
})
export class ThyFormVerticalExampleComponent implements OnInit {
    submitSuccess = false;

    provinceCities = provinceCities;

    values: any[] = null;

    model: any = {
        select: 1,
        checkbox: 0,
        group: 1
    };

    validatorConfig = {
        validationMessages: {
            username: {
                required: '重写用户名不能为空错误信息'
            }
        }
    };

    options = [
        {
            _id: 1,
            value: '选项1'
        },
        {
            _id: 2,
            value: '选项2'
        }
    ];

    showDescProperty = false;

    checkUserName = (value: string) => {
        console.log(`remote checkUserName`);
        return of(value === 'why520crazy');
    };

    constructor() {
        setTimeout(() => {
            this.showDescProperty = true;
        }, 300);
    }

    ngOnInit(): void {}

    save(form: any) {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }

    onChanges(event: Event) {}
}

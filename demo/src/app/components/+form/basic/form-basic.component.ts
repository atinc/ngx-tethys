import { Component, OnInit, TemplateRef } from '@angular/core';
import { of } from 'rxjs';
import { ThyModalService } from '../../../../../../src/modal';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                        isLeaf: true
                    }
                ]
            },
            {
                value: 'ningbo',
                label: 'Ningbo',
                isLeaf: true
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                disabled: true,
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                        isLeaf: true
                    }
                ]
            }
        ]
    },
    {
        value: 'henan',
        label: 'Henan',
        disabled: true,
        children: [
            {
                value: 'zhengzhou',
                label: 'Zhengzhou',
                children: [
                    {
                        value: 'zhoukou',
                        label: 'Zoukou',
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];

@Component({
    selector: 'app-demo-form-basic',
    templateUrl: './form-basic.component.html'
})
export class DemoFormBasicComponent implements OnInit {
    submitSuccess = false;

    showDescProperty = false;
    public thyOptions = options;

    /** ngModel value */
    public values: any[] = null;

    model: any = {
        select: 1,
        checkbox: 0,
        group: 1
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

    validatorConfig = {
        validationMessages: {
            username: {
                required: '重写用户名不能为空错误信息'
            }
        }
    };

    checkUserName = (value: string) => {
        console.log(`remote checkUserName`);
        return of(value === 'why520crazy');
    };

    constructor(private thyModalService: ThyModalService) {
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

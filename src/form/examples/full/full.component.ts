import { Component, OnInit } from '@angular/core';
import { ThyFormValidatorConfig, ThyFormDirective } from 'ngx-tethys/form';

const provinceCities = [
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
    selector: 'thy-form-full-example',
    templateUrl: './full.component.html',
    standalone: false
})
export class ThyFormFullExampleComponent implements OnInit {
    submitSuccess = false;

    provinceCities = provinceCities;

    /** ngModel value */
    values: string[] = null;

    model = {
        name: '',
        display_name: '',
        select: 1,
        checkbox: 0,
        group: 1
    };

    options = [
        {
            _id: 1,
            value: 'Option1'
        },
        {
            _id: 2,
            value: 'Option2'
        }
    ];

    date = { date: new Date(), with_time: 0 };

    dateNull: number = null;

    dateRange: any = null;

    constructor() {}

    ngOnInit(): void {}

    save(form: any) {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }

    onChanges(event: Event) {}

    onChange(result: Date): void {
        console.log('onChange: ', result);
    }
}

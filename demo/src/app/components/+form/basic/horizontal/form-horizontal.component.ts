import { Component, OnInit } from '@angular/core';

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
    selector: 'app-demo-form-horizontal',
    templateUrl: './form-horizontal.component.html'
})
export class DemoFormHorizontalComponent implements OnInit {
    submitSuccess = false;

    thyOptions = options;

    /** ngModel value */
    values: any[] = null;

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

    date = { date: new Date(), with_time: 0 };

    dateNull = null;

    dateRange = null;

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

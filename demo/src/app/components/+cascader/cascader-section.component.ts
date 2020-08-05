import { Component, OnInit } from '@angular/core';

const customerOptions = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        code: 477200,
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                        code: 752100,
                        isLeaf: true
                    }
                ]
            },
            {
                value: 'ningbo',
                label: 'Ningbo',
                code: '315000',
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
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                        code: 453400,
                        isLeaf: true
                    }
                ]
            }
        ]
    }
];

import options from './cascader-address-options';
import { stringify } from 'querystring';

@Component({
    selector: 'demo-confirm-section',
    templateUrl: './cascader-section.component.html',
    styles: [
        `
            .demo-select {
                width: 500px;
            }
        `
    ]
})
export class DemoCascaderSectionComponent implements OnInit {
    public ngModel = 'zhejiang';
    public ngModel2 = 'zhejiang';
    /** init data */
    public thyOptions = null;

    public thyCustomerOptions = null;

    /** ngModel value */
    public values: any[] = [''];

    ngOnInit(): void {
        // let's set nzOptions in a asynchronous way
        setTimeout(() => {
            this.thyOptions = options;
            console.log(JSON.stringify(this.thyOptions));
            this.thyCustomerOptions = customerOptions;
        }, 100);
    }

    public onChanges(values: any): void {
        console.log(values);
    }

    public handleAreaClick($event, label, selectedOptions) {
        console.log(label);
        console.log(selectedOptions);
    }
}

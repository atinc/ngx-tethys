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

@Component({
    selector: 'thy-cascader-add-code-example',
    templateUrl: './add-code.component.html'
})
export class ThyCascaderAddCodeExampleComponent implements OnInit {
    public values: any[] = [''];

    public curVal = 'zhejiang';

    public thyCustomerOptions: any[] = null;

    constructor() {}

    ngOnInit() {
        this.thyCustomerOptions = customerOptions;
    }

    public onChanges(values: any): void {}

    public handleAreaClick($event: any, label: any, selectedOptions: any) {}
}

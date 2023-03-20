import { Component, OnInit } from '@angular/core';
import { clone, options } from '../cascader-address-options';

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
        disabled: true,
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                disabled: true,
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                        code: 453400,
                        isLeaf: true,
                        disabled: true
                    }
                ]
            }
        ]
    }
];
@Component({
    selector: 'thy-cascader-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyCascaderDisabledExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [];

    public curVal = ['11', '1101', '110102'];

    public value = ['jiangsu', 'nanjing', 'zhonghuamen'];

    public thyCustomerOptions: any[] = null;

    constructor() {}

    ngOnInit() {
        this.areaCode = clone(options);
        this.thyCustomerOptions = customerOptions;
    }
}

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
    },
    {
        value: 'neimeng',
        label: '内蒙古自治区',
        children: [
            {
                value: 'naransebusitaiyinbulage',
                label: '虚构的城市名称特别长，用于展示超出会出现提示功能',
                code: 103034,
                isLeaf: true
            }
        ]
    },
    {
        value: 'heilongjiang',
        label: '黑龙江',
        children: []
    }
];

@Component({
    selector: 'thy-cascader-custom-label-template-example',
    templateUrl: './custom-label-template.component.html',
    standalone: false
})
export class ThyCascaderCustomLabelTemplateExampleComponent implements OnInit {
    public values: any[] = [];

    public curVal: any = [['zhejiang', 'hangzhou', 'xihu']];

    public thyCustomerOptions: any[] = null;

    constructor() {}

    ngOnInit() {
        this.thyCustomerOptions = customerOptions;
    }

    public selectChange(values: any): void {
        console.log(values);
    }

    public handleAreaClick($event: any, label: any, selectedOptions: any) {}
}

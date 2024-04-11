import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';

const customerOptions = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        code: 477200,
        readonly: true,
        children: [
            {
                value: 'ningbo',
                label: 'Ningbo',
                code: '315000',
                isLeaf: true
            },
            {
                value: 'hangzhou',
                label: 'hangZhou',
                code: '315001',
                isLeaf: true
            }
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        readonly: true,
        children: [
            {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
                code: 453400,
                isLeaf: true
            }
        ]
    },
    {
        value: 'neimeng',
        label: '内蒙古自治区',
        readonly: true,
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
        readonly: true,
        children: []
    }
];

@Component({
    selector: 'thy-cascader-custom-option-template-example',
    templateUrl: './custom-option-template.component.html'
})
export class ThyCascaderCustomOptionTemplateExampleComponent implements OnInit {
    public areaCode: any[] = [];

    public values: any[] = [['zhejiang', 'hangzhou']];

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = customerOptions;
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}

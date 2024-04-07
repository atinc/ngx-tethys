import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';

const customerOptions = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        code: 477200,
        disableSelect: true,
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
        disableSelect: true,
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
        disableSelect: true,
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
        disableSelect: true,
        children: []
    }
];

@Component({
    selector: 'thy-cascader-custom-option-example',
    templateUrl: './custom-option.component.html'
})
export class ThyCascaderCustomOptionExampleComponent implements OnInit {
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

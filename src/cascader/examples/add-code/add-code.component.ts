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
    public thyOptions: any[] = [];

    public values: any[] = [''];

    public ngModel2 = 'zhejiang';

    public thyCustomerOptions: any[] = null;

    constructor() {}

    ngOnInit() {
        this.thyOptions = [
            {
                label: '北京市',
                value: '11',
                children: [
                    {
                        label: '市辖区',
                        value: '1101',
                        children: [
                            { label: '东城区', value: '110101', isLeaf: true },
                            { label: '西城区', value: '110102', isLeaf: true },
                            { label: '朝阳区', value: '110105', isLeaf: true },
                            { label: '丰台区', value: '110106', isLeaf: true },
                            { label: '石景山区', value: '110107', isLeaf: true },
                            { label: '海淀区', value: '110108', isLeaf: true },
                            { label: '门头沟区', value: '110109', isLeaf: true },
                            { label: '房山区', value: '110111', isLeaf: true },
                            { label: '通州区', value: '110112', isLeaf: true },
                            { label: '顺义区', value: '110113', isLeaf: true },
                            { label: '昌平区', value: '110114', isLeaf: true },
                            { label: '大兴区', value: '110115', isLeaf: true },
                            { label: '怀柔区', value: '110116', isLeaf: true },
                            { label: '平谷区', value: '110117', isLeaf: true },
                            { label: '密云区', value: '110118', isLeaf: true },
                            { label: '延庆区', value: '110119', isLeaf: true }
                        ]
                    }
                ]
            }
        ];
        this.thyCustomerOptions = customerOptions;
    }

    public onChanges(values: any): void {}

    public handleAreaClick($event: any, label: any, selectedOptions: any) {}
}

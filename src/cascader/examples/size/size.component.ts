import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-cascader-size-example',
    templateUrl: './size.component.html'
})
export class ThyCascaderSizeExampleComponent implements OnInit {
    public thyOptions: any[] = [];

    public values: any[] = [''];

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
    }

    public onChanges(values: any): void {}
}

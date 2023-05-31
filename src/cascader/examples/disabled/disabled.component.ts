import { Component, OnInit } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
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

    public values: any[] = [['12', '1201', '120102']];

    public curVal = ['11', '1101', '110102'];

    public value = ['jiangsu', 'nanjing', 'zhonghuamen'];

    public multiOptions: any[] = [];

    public multiValues: any[] = [
        ['12', '1201', '120102'],
        ['12', '1201', '120103'],
        ['14', '1404', '140406']
    ];

    public thyCustomerOptions: any[] = null;

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        this.areaCode = clone(options);
        this.thyCustomerOptions = customerOptions;
        this.setMultiOptions();
    }

    private setMultiOptions() {
        this.multiOptions = clone(options).map((area: any) => {
            if (this.multiValues.map(item => item[0]).includes(area.value)) {
                area.disabled = true;
                area.children = area.children
                    .filter((item: any) => {
                        if (this.multiValues.map(item => item[1]).includes(item.value)) {
                            return true;
                        }
                    })
                    .map((item: any) => {
                        if (this.multiValues.map(item => item[1]).includes(item.value)) {
                            item.disabled = true;
                            item.children = item.children
                                .filter((data: any) => {
                                    if (this.multiValues.map(item => item[2]).includes(data.value)) {
                                        return true;
                                    }
                                })
                                .map((data: any) => {
                                    if (this.multiValues.map(item => item[2]).includes(data.value)) {
                                        data.disabled = true;
                                    }
                                    return data;
                                });
                        }
                        return item;
                    });
            }
            return area;
        });
    }

    public selectChanges(values: any): void {
        this.notifyService.info(`selected Value is ${values}`);
    }
}

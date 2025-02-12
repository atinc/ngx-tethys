import { Component, OnInit, inject } from '@angular/core';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { clone, options } from '../cascader-address-options';
import { SafeAny } from 'ngx-tethys/types';
import { ThyFormDirective, ThyFormGroup } from 'ngx-tethys/form';
import { ThyCascader } from 'ngx-tethys/cascader/cascader.component';
import { ThyTagModule } from 'ngx-tethys/tag';

import { FormsModule } from '@angular/forms';

const customOptions: SafeAny[] = [
    { label: '全部', value: 'all', children: [], isLeaf: true },
    { label: '自定义选项2', value: 'custom_option_1', children: [], isLeaf: true }
];

@Component({
    selector: 'thy-cascader-custom-options-example',
    templateUrl: './custom-options.component.html',
    imports: [ThyFormDirective, ThyFormGroup, ThyCascader, ThyTagModule, FormsModule]
})
export class ThyCascaderCustomOptionsExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    public areaCode: SafeAny[] = [];

    public options: SafeAny[] = [];

    public values: SafeAny[] = ['all'];

    public singleValues: SafeAny[] = ['12', '1201', '120102'];

    public multipleValues: SafeAny[] = [['night']];

    public multipleValues2: SafeAny[] = [['11'], ['12', '1201', '120102'], ['12', '1201', '120103'], ['14', '1404', '140406']];

    public customOptions: SafeAny[] = customOptions;

    public customOptions2: SafeAny[] = [
        { text: '全部', _id: 'all', children: [], isLeaf: true },
        { text: '夜晚', _id: 'night', children: [], isLeaf: true }
    ];

    ngOnInit() {
        this.areaCode = clone(options);
        this.options = [
            {
                _id: '65518b58c012b3be15145d4c',
                text: '丙',
                children: [],
                isLeaf: true
            },
            {
                _id: '65518b58c012b3be15145d4d',
                text: '丁',
                children: [],
                isLeaf: true
            },
            {
                _id: '65518b58c012b3be15145d4a',
                text: '甲',
                children: [
                    {
                        _id: '65518b58c012b3be15145d51',
                        text: '子',
                        children: [
                            {
                                _id: '6555d557dae9459d8466421a',
                                text: '十一点',
                                children: [],
                                isLeaf: true
                            }
                        ],
                        isLeaf: false
                    },
                    {
                        _id: '65518b58c012b3be15145d50',
                        text: '丑',
                        children: [
                            {
                                _id: '6555d557dae9459d8466421b',
                                text: '一点',
                                children: [],
                                isLeaf: true
                            }
                        ],
                        isLeaf: false
                    },
                    {
                        _id: '65518b58c012b3be15145d4f',
                        text: '寅',
                        children: [
                            {
                                _id: '6555d557dae9459d8466421c',
                                text: '三点',
                                children: [],
                                isLeaf: true
                            }
                        ],
                        isLeaf: false
                    },
                    {
                        _id: '65518b58c012b3be15145d4e',
                        text: '卯',
                        children: [],
                        isLeaf: true
                    }
                ],
                isLeaf: false
            },
            {
                _id: '65518b58c012b3be15145d4b',
                text: '乙',
                children: [],
                isLeaf: true
            }
        ];
    }

    public selectChanges(values: SafeAny): void {
        this.notifyService.info(`selected data is ${values}`);
    }
}

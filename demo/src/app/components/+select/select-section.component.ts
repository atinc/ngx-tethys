
import { Component } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
    selector: 'demo-select-section',
    templateUrl: './select-section.component.html',
})
export class DemoSelectSectionComponent {

    model = {
        selectedValue: ''
    };

    selectedItem: any;

    optionData = [{
        icon: 'wtf wtf-type-task',
        name: '任务',
        _id: '5b0527cfc8f2ff200a33d4aa'
    }, {
        icon: 'wtf wtf-type-money',
        name: '钱',
        _id: '5b0527cfc8f2ff200a33d4ab'
    }, {
        icon: 'wtf wtf-type-worksheet',
        name: '工时',
        _id: '5b0527cfc8f2ff200a33d4ac'
    }, {
        icon: 'wtf wtf-type-demand',
        name: '需求',
        _id: '5b0527cfc8f2ff200a33d4ad'
    }, {
        // icon: 'wtf wtf-type-ios',
        name: 'IOS缺陷',
        _id: '5b0527cfc8f2ff200a33d4b1'
    }];

    public apiParameters = [
        {
            property: 'thySize',
            description: '大小，sm、lg',
            type: 'String',
            default: ''
        },
        {
            property: 'thyIsSearch',
            description: '下拉列表是否显示搜索框',
            type: 'boolean',
            default: 'false'
        }
    ];

    public optionApiParameters = [
        {
            property: '[icon]',
            description: '可传图标',
            type: 'String',
            default: ''
        },
        {
            property: 'hasSelectedIcon',
            description: '是否显示选中图标',
            type: 'boolean',
            default: 'false'
        },
        {
            property: '[value]',
            description: '每个option的value值',
            type: 'string',
            default: ''
        },
        {
            property: '[label]',
            description: '每个option的label，用于显示',
            type: 'String',
            default: ''
        }
    ];

    constructor(
    ) { }

    change() {
        console.log(`select change value as :${this.model.selectedValue}`);
    }
}

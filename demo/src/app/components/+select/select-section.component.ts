
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
        display_name: '任务',
        name: 'task',
        pin_yin: 'r,re,ren,renw,renwu',
        _id: '5b0527cfc8f2ff200a33d4aa'
    }, {
        icon: 'wtf wtf-type-money',
        display_name: '钱',
        name: 'money',
        pin_yin: 'qian',
        _id: '5b0527cfc8f2ff200a33d4ab'
    }, {
        icon: 'wtf wtf-type-worksheet',
        display_name: '工时',
        name: 'worksheet',
        pin_yin: 'gongshi',
        _id: '5b0527cfc8f2ff200a33d4ac'
    }, {
        icon: 'wtf wtf-type-demand',
        display_name: '需求',
        name: 'requirement',
        _id: '5b0527cfc8f2ff200a33d4ad'
    }, {
        // icon: 'wtf wtf-type-ios',
        display_name: 'IOS缺陷',
        name: 'ios',
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
            property: 'thyShowSearch',
            description: '下拉列表是否显示搜索框',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPlaceHolder',
            description: '选择框默认文字',
            type: 'string',
            default: ''
        },
        {
            property: 'thyServerSearch',
            description: '是否使用服务端搜索，当为 true 时，将不再在前端进行过滤',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOnSearch',
            description: '搜索时回调',
            type: '(searchText:string)=>{}'
        },
        {
            property: 'thyMultiSelect',
            description: '是否为多选模式',
            type: 'boolean',
            default: 'false'
        }
    ];

    public optionApiParameters = [
        {
            property: 'thyOptionValue',
            description: '每个option的value值',
            type: 'string',
            default: ''
        },
        {
            property: 'thyOptionLabel',
            description: '每个option的label，用于显示',
            type: 'string',
            default: ''
        },
        {
            property: 'thyShowOptionCustom',
            description: '是否自定义展示option内容',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyOptionSearchKey',
            description: '传入搜索需要的关键字，如不传则默认按照label进行搜索, 此为前端过滤',
            type: 'string',
            default: ''
        },
        {
            property: 'thyOptionDisabled',
            description: '是否禁用',
            type: 'boolean',
            default: 'false'
        }
    ];

    constructor(
    ) { }

    change() {
        console.log(`select change value as :${this.model.selectedValue}`);
    }

    searchTextChange(event: any) {
        console.log(event);
    }
}

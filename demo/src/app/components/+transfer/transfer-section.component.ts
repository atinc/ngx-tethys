import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyTransferData, ThyTransferItem } from '../../../../../src/transfer/transfer.interface';
@Component({
    selector: 'demo-transfer-section',
    templateUrl: './transfer-section.component.html',
    styleUrls: ['./transfer-section.component.scss']
})
export class DemoTransferSectionComponent {

    public transferData: ThyTransferItem[] = [{
        title: '第1条数据',
        direction: 'left'
    }, {
        title: '第2条数据',
        direction: 'left'
    }, {
        title: '第3条数据',
        direction: 'left'
    }, {
        title: '第4条数据',
        direction: 'left'
    }, {
        title: '第5条数据',
        direction: 'right'
    }, {
        title: '第6条数据',
        direction: 'right'
    }, {
        title: '第7条数据',
        direction: 'right'
    }, {
        title: '第8条数据',
        direction: 'right'
    }, {
        title: '第9条数据',
        direction: 'right'
    }];

    public apiParameters = [
        {
            property: 'thyData',
            description: 'Transfer数据源',
            type: 'ThyTransferItem[]',
            default: ''
        },
        {
            property: 'thyTitles',
            description: 'Transfer Title 集合',
            type: 'String[]',
            default: ''
        },
        {
            property: 'thyAutoMove',
            description: '设置是否自动移动',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: '#renderTemplate',
            description: '设置自定义Item渲染数据模板',
            type: 'TemplateRef',
            default: ''
        },
        {
            property: '(thyChange)',
            description: 'Transfer变化的回调事件',
            type: 'ThyTransferChangeEvent',
            default: ''
        }
    ];

    public transferItemParameters = [
        {
            property: 'title',
            description: '数据标题',
            type: 'String',
            default: ''
        },
        {
            property: 'direction',
            description: '设置方向，可选值 [left,right]',
            type: 'String',
            default: ''
        },
        {
            property: 'checked',
            description: '选中状态',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: '[key:string]',
            description: '自定义数据',
            type: 'Any',
            default: ''
        }
    ];

    constructor() {

    }

    onTransferChange(event) {
        console.log(event);
    }
}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyTransferData, ThyTransferItem } from '../../../../../src/transfer/transfer.interface';
import { TransferDirection } from '../../../../../src/public-api';
@Component({
    selector: 'demo-transfer-section',
    templateUrl: './transfer-section.component.html',
    styleUrls: ['./transfer-section.component.scss']
})
export class DemoTransferSectionComponent {

    public transferData: ThyTransferItem[] = [{
        id: 1,
        title: '第1条数据',
        direction: TransferDirection.left
    }, {
        id: 2,
        title: '第2条数据',
        direction: TransferDirection.left
    }, {
        id: 3,
        title: '第3条数据',
        direction: TransferDirection.left
    }, {
        id: 4,
        title: '第4条数据',
        direction: TransferDirection.left
    }, {
        id: 5,
        title: '第5条数据',
        direction: TransferDirection.right
    }, {
        id: 6,
        title: '第6条数据',
        direction: TransferDirection.right
    }, {
        id: 7,
        title: '第7条数据',
        direction: TransferDirection.right
    }, {
        id: 8,
        title: '第8条数据',
        direction: TransferDirection.right
    }, {
        id: 9,
        title: '第9条数据',
        direction: TransferDirection.right
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

    onDragUpdate(event) {
        console.log(event);
    }

    onTransferChange(event) {
        console.log(event);
    }
}

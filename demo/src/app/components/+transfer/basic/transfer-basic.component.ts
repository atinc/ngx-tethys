import { Component, OnInit } from '@angular/core';
import { TransferDirection, ThyTransferItem, ThyTransferDragEvent } from 'ngx-tethys';

@Component({
    selector: 'demo-transfer-basic',
    templateUrl: './transfer-basic.component.html'
})
export class TransferBasicComponent implements OnInit {
    public lockItems: ThyTransferItem[] = [];

    public unlockItems: ThyTransferItem[] = [];

    public maxLock = 2;

    public selectedLeft;

    public transferData: ThyTransferItem[] = [
        {
            id: 1,
            title: '第1条数据',
            direction: TransferDirection.right
        },
        {
            id: 2,
            title: '第2条数据',
            direction: TransferDirection.left
        },
        {
            id: 3,
            title: '第3条数据',
            direction: TransferDirection.left
        },
        {
            id: 4,
            title: '第4条数据',
            direction: TransferDirection.left
        },
        {
            id: 5,
            title: '第5条数据',
            direction: TransferDirection.right
        },
        {
            id: 6,
            title: '第6条数据',
            direction: TransferDirection.left
        },
        {
            id: 7,
            title: '第7条数据',
            direction: TransferDirection.right
        },
        {
            id: 8,
            title: '第8条数据',
            direction: TransferDirection.right,
            isFixed: true
        },
        {
            id: 9,
            title: '第9条数据',
            direction: TransferDirection.right,
            isLock: true
        }
    ];

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

    constructor() {}

    ngOnInit() {}

    onDragUpdate(event: ThyTransferDragEvent) {
        this.lockItems = event.right.lock;
        this.unlockItems = event.right.unlock;
        console.log(event);
    }

    onTransferChange(event) {
        this.lockItems = event.right.lock;
        this.unlockItems = event.right.unlock;
        console.log(event);
    }

    select(
        item: ThyTransferItem,
        selectItem: (item: ThyTransferItem) => void,
        unselectItem: (item: ThyTransferItem) => void
    ) {
        if (item.direction === TransferDirection.left) {
            selectItem(item);
        } else {
            unselectItem(item);
        }
    }
}

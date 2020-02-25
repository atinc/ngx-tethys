import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import {
    ThyTransferData,
    ThyTransferItem,
    ThyTransferDragEvent,
    TransferDirection
} from '../../../../../src/transfer/transfer.interface';
import { Subject } from 'rxjs';
import { ThySelectionListChange } from 'ngx-tethys';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { TransferBasicComponent } from './basic/transfer-basic.component';
import { TransferTemplateComponent } from './template/transfer-template.component';

@Component({
    selector: 'demo-transfer-section',
    templateUrl: './transfer-section.component.html',
    styleUrls: ['./transfer-section.component.scss']
})
export class DemoTransferSectionComponent {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Basic',
            component: TransferBasicComponent,
            description: `基本使用`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'transfer-basic.component.html',
                    content: require('!!raw-loader!./basic/transfer-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'transfer-basic.component.ts',
                    content: require('!!raw-loader!./basic/transfer-basic.component.ts')
                }
            ]
        },
        {
            title: 'Template',
            component: TransferTemplateComponent,
            description: `使用template自定义列表`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'transfer-template.component.html',
                    content: require('!!raw-loader!./template/transfer-template.component.html')
                },
                {
                    type: 'ts',
                    name: 'transfer-template.component.ts',
                    content: require('!!raw-loader!./template/transfer-template.component.ts')
                }
            ]
        }
    ];

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
            property: '#renderLeftContent',
            description: '设置自定义左侧内容模版',
            type: 'TemplateRef',
            default: ''
        },
        {
            property: '#renderRightContent',
            description: '设置自定义右侧内容模版',
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

    public transferRenderContentParameters = [
        {
            property: 'items',
            description: '分类后的数据',
            type: 'ThyTransferItem',
            default: '[]'
        },
        {
            property: 'onSelectItem',
            description: '选择item',
            default: '(item: ThyTransferItem) => void'
        },
        {
            property: 'onUnselectItem',
            description: '取消选择item',
            default: '(item: ThyTransferItem) => void'
        }
    ];

    transferData2 = JSON.parse(JSON.stringify(this.transferData));

    constructor() {}

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

    selectionChange(
        item: ThyTransferItem,
        selectItem: (item: ThyTransferItem) => void,
        unselectItem: (tem: ThyTransferItem) => void
    ) {
        if (item.direction === 'left') {
            selectItem(item);
        } else {
            unselectItem(item);
        }
    }
}

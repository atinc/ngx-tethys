import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import {
    ThyTree,
    ThyTreeBeforeDragDropContext,
    ThyTreeBeforeDragStartContext,
    ThyTreeDragDropEvent,
    ThyTreeDropPosition
} from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-drag-drop-example',
    templateUrl: './drag-drop.component.html',
    imports: [ThyTree, ThyIcon]
})
export class ThyTreeDragDropExampleComponent implements OnInit {
    treeNodes = [
        {
            key: '000001',
            title: '000001（不可拖拽）',
            expanded: true,
            children: [
                {
                    key: '000001-01',
                    title: '000001-01',
                    children: [
                        {
                            key: '000001-01-01',
                            title: '000001-01-01'
                        }
                    ]
                },
                {
                    key: '000001-02',
                    title: '000001-02'
                },
                {
                    key: '000001-03',
                    title: '000001-03'
                }
            ]
        },
        {
            key: '000002',
            title: '000002（禁用的）',
            disabled: true
        },
        {
            key: '000003',
            title: '000003（不可拖入）'
        },
        {
            key: '000004',
            title: '000004'
        }
    ];

    constructor() {}

    ngOnInit() {}

    beforeDragDrop(event: ThyTreeBeforeDragDropContext) {
        return !(event.item.title.includes('不可拖入') && event.position === ThyTreeDropPosition.in);
    }

    beforeDragStart(event: ThyTreeBeforeDragStartContext) {
        return !event.item.title.includes('不可拖拽');
    }

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

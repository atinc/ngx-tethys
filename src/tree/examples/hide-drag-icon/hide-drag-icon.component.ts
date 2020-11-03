import { Component, OnInit } from '@angular/core';
import { ThyDragDropEvent, ThyTreeNode } from 'ngx-tethys';

@Component({
    selector: 'thy-tree-hide-drag-icon-example',
    templateUrl: './hide-drag-icon.component.html'
})
export class ThyTreeHideDragIconExampleComponent implements OnInit {
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
            title: '000002'
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

    beforeDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        return !event.item.title.includes('不可拖入');
    }

    beforeDragStart(event: ThyDragDropEvent<ThyTreeNode>) {
        return !event.item.title.includes('不可拖拽');
    }

    onDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {}
}

import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
    selector: 'demo-drop-drag',
    templateUrl: './drop-drag.component.html',
    styleUrls: ['./drop-drag.scss']
})
export class DropDragComponent implements OnInit {
    public treeNodes: any[] = [
        {
            key: '01',
            title: '北京',
            icon: 'wtf wtf-drive-o',
            origin: { type: 1 },
            iconStyle: { color: 'red' },
            children: [
                {
                    key: '01001',
                    title: '海淀',
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '西二旗',
                            title: '西二旗',
                            icon: 'wtf wtf-file-text'
                        },
                        {
                            key: '西三旗',
                            title: '西三旗',
                            icon: 'wtf wtf-file-text'
                        }
                    ]
                },
                {
                    key: '01002',
                    title: 'child2',
                    icon: 'wtf wtf-file-text'
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            origin: { type: 1 },
            icon: 'wtf wtf-drive-o',
            expanded: true,
            children: []
        }
    ];

    public projects = [
        {
            id: 1,
            name: '项目1'
        },
        {
            id: 2,
            name: '项目2'
        },
        {
            id: 3,
            name: '项目3'
        },
        {
            id: 4,
            name: '项目分组1',
            children: [
                {
                    id: 1,
                    name: '项目1'
                },
                {
                    id: 2,
                    name: '项目2'
                },
                {
                    id: 3,
                    name: '项目3'
                },
                {
                    id: 4,
                    name: '项目分组2',
                    children: [
                        {
                            id: 1,
                            name: '项目1'
                        },
                        {
                            id: 2,
                            name: '项目2'
                        },
                        {
                            id: 3,
                            name: '项目3',
                            children: []
                        }
                    ]
                }
            ]
        }
    ];

    public treeNodesSortableOptions: SortablejsOptions = {
        group: {
            name: 'project-nav'
        },
        animation: 250,
        ghostClass: 'thy-sortable-ghost',
        chosenClass: 'thy-tree-item-chosen',
        // handle: '.thy-sortable-handle',
        filter: '.thy-sortable-disabled',
        draggable: 'thy-sortable-item',
        dragClass: '.thy-sortable-drag'
    };

    ngOnInit(): void {}

    public draggableNode(event) {
        console.log(event);
    }

    sort(event) {
        const a = event;
    }

    move(event) {
        const a = event;
    }
}

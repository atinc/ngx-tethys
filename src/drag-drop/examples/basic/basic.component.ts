import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyDragStartEvent, ThyDropPosition } from 'ngx-tethys/drag-drop';

const nodes = [
    {
        key: '000001',
        title: '000001（不可拖拽）',
        draggable: false,
        children: [
            {
                key: '000001-01',
                title: '000001-01'
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
        title: '000002',
        draggable: true,
        children: []
    },
    {
        key: '000003',
        title: '000003（不可拖入）',
        draggable: true,
        disabled: true,
        children: []
    },
    {
        key: '000004',
        title: '000004',
        draggable: true,
        children: []
    }
];

export interface ThyDragDropEvent<T = any> {
    event?: DragEvent;
    item?: T;
    containerItems?: T[];
    currentIndex: number;
    position?: ThyDropPosition;
    previousItem?: T;
    previousIndex?: number;
    previousContainerItems?: T[];
}

type DragDropNode = typeof nodes[0];

@Component({
    selector: 'thy-drag-drop-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss']
})
export class ThyDragDropBasicExampleComponent implements OnInit {
    nodes = nodes;

    constructor() {}

    ngOnInit() {}

    beforeDragStart = (event: ThyDragStartEvent) => {
        return event;
    };

    beforeDragOver = () => {
        return true;
    };

    beforeDragDrop = () => {
        return true;
    };

    onDragStart(event: ThyDragStartEvent) {
        console.log(event.item);
    }

    onDragDrop(event: ThyDragDropEvent<DragDropNode>) {
        if (event.position === ThyDropPosition.in) {
            event.item.children.push(event.previousItem);
            event.previousContainerItems.splice(event.previousIndex);
        } else {
            moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex);
        }
    }
}

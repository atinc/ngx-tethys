import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyDragOverEvent, ThyDragStartEvent, ThyDropPosition } from 'ngx-tethys/drag-drop';

const nodes = [
    {
        key: '000001',
        title: '000001',
        draggable: true,
        children: [
            {
                key: '000001-01',
                title: '000001-01',
                draggable: true,
                children: []
            },
            {
                key: '000001-02',
                title: '000001-02',
                draggable: true,
                children: []
            },
            {
                key: '000001-03',
                title: '000001-03',
                draggable: true,
                children: []
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
        title: '000003',
        draggable: true,
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
    selector: 'thy-drag-drop-tree-drag-example',
    templateUrl: './tree-drag.component.html',
    styleUrls: ['./tree-drag.component.scss']
})
export class ThyDragDropTreeDragExampleComponent implements OnInit {
    nodes = nodes;

    constructor() {}

    ngOnInit() {}

    beforeDragStart = (event: ThyDragStartEvent<DragDropNode>) => {
        return event.item.draggable;
    };

    beforeDragOver = (event: ThyDragOverEvent<DragDropNode>) => {
        return true;
    };

    beforeDragDrop = (event: ThyDragDropEvent<DragDropNode>) => {
        return true;
    };

    onDragStart(event: ThyDragStartEvent) {}

    onDragOver(event: ThyDragStartEvent) {}

    onDragDrop(event: ThyDragDropEvent<DragDropNode>) {
        console.log(event);
        if (event.position === ThyDropPosition.in && event.item.children) {
            event.item.children.push(event.previousItem);
            event.previousContainerItems.splice(event.previousIndex, 1);
        } else {
            moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex - 1);
        }
    }
}

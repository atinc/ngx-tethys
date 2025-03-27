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
                draggable: true
            },
            {
                key: '000001-02',
                title: '000001-02',
                draggable: true
            },
            {
                key: '000001-03',
                title: '000001-03',
                draggable: true
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

interface DragDropNode {
    key: string;
    title: string;
    draggable: true;
    children?: DragDropNode[];
}

@Component({
    selector: 'thy-drag-drop-tree-drag-example',
    templateUrl: './tree-drag.component.html',
    styleUrls: ['./tree-drag.component.scss'],
    standalone: false
})
export class ThyDragDropTreeDragExampleComponent implements OnInit {
    nodes = nodes;

    constructor() {}

    ngOnInit() {}

    beforeDragStart = (event: ThyDragStartEvent<DragDropNode>) => {
        return event.item.draggable;
    };

    beforeDragOver = (event: ThyDragOverEvent<DragDropNode>) => {
        return !this.IsWillDropOnChildNode(event.previousItem, event.item);
    };

    beforeDragDrop = (event: ThyDragDropEvent<DragDropNode>) => {
        return !this.IsWillDropOnChildNode(event.previousItem, event.item);
    };

    onDragStart(event: ThyDragStartEvent) {}

    onDragOver(event: ThyDragStartEvent) {}

    onDragDrop(event: ThyDragDropEvent<DragDropNode>) {
        const dragItem = event.previousItem;
        if (event.position === ThyDropPosition.in && event.item.children) {
            event.item.children.push(dragItem);
            event.previousContainerItems.splice(event.previousIndex, 1);
            return;
        }

        const prevIsInContainer = event.containerItems.find(item => item.key === dragItem.key);
        if (prevIsInContainer) {
            moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex - 1);
        } else {
            event.containerItems.splice(event.currentIndex, 0, dragItem);
            event.previousContainerItems.splice(event.previousIndex, 1);
        }
    }

    IsWillDropOnChildNode(dragItem: DragDropNode, willDropItem: DragDropNode) {
        if (!dragItem.children?.length) {
            return false;
        }
        const IsInChildren = dragItem.children.some(item => item.key === willDropItem.key);
        if (IsInChildren) {
            return true;
        } else {
            const isInGrandChildren = dragItem.children.some(item => {
                return item.children && item.children.length && this.IsWillDropOnChildNode(item, willDropItem);
            });
            return isInGrandChildren;
        }
    }
}

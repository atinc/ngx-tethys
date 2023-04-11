import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyDropPosition } from 'ngx-tethys/drag-drop';

const nodes = [
    {
        key: '000001',
        title: '000001'
    },
    {
        key: '000002',
        title: '000002(不可拖拽项)',
        disabled: true
    },
    {
        key: '000003',
        title: '000003'
    },
    {
        key: '000004',
        title: '000004'
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

type DragDropNode = (typeof nodes)[0];

@Component({
    selector: 'thy-drag-drop-disabled-example',
    templateUrl: './disabled.component.html'
})
export class ThyDragDropDisabledExampleComponent implements OnInit {
    nodes = nodes;

    disabled = false;

    constructor() {}

    ngOnInit() {}

    onDragDrop(event: ThyDragDropEvent<DragDropNode>) {
        moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex);
    }
}

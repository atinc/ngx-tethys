import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyDropContainerDirective, ThyDropPosition, ThyDragDirective } from 'ngx-tethys/drag-drop';
import { ThySpace, ThySpaceItemDirective } from 'ngx-tethys/space';
import { ThyButton } from 'ngx-tethys/button';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

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
    templateUrl: './disabled.component.html',
    imports: [ThySpace, ThySpaceItemDirective, ThyButton, ThyList, ThyDropContainerDirective, ThyListItem, ThyDragDirective]
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

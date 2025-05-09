import { Component, OnInit } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyDragDirective, ThyDropContainerDirective, ThyDropPosition } from 'ngx-tethys/drag-drop';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

const nodes = [
    {
        key: '000001',
        title: '000001'
    },
    {
        key: '000002',
        title: '000002'
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
    selector: 'thy-drag-drop-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyList, ThyDropContainerDirective, ThyListItem, ThyDragDirective]
})
export class ThyDragDropBasicExampleComponent implements OnInit {
    nodes = nodes;

    constructor() {}

    ngOnInit() {
        let flag = true;
        setInterval(() => {
            if (flag) {
                this.nodes = nodes.slice(0, 3);
            } else {
                this.nodes = nodes;
            }
            flag = !flag;
        }, 2000);
    }

    onDragDrop(event: ThyDragDropEvent<DragDropNode>) {
        moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex);
    }
}

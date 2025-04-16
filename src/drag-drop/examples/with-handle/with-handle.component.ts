import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ThyDragDirective, ThyDragDropEvent, ThyDragHandleDirective, ThyDropContainerDirective } from 'ngx-tethys/drag-drop';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyListItem, ThyList } from 'ngx-tethys/list';

@Component({
    selector: 'thy-drag-drop-with-handle-example',
    templateUrl: './with-handle.component.html',
    imports: [ThyList, ThyDropContainerDirective, ThyListItem, ThyDragDirective, ThyDragHandleDirective, ThyIcon]
})
export class ThyDragDropWithHandleExampleComponent implements OnInit {
    nodes = [
        {
            key: '000001',
            title: '000001（不可拖拽）',
            draggable: false,
            handleDisabled: true
        },
        {
            key: '000002',
            title: '000002',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000003',
            title: '000003',
            draggable: true,
            handleDisabled: false
        },
        {
            key: '000004',
            title: '000004',
            draggable: true,
            handleDisabled: false
        }
    ];

    constructor() {}

    ngOnInit() {}

    onDragDrop(event: ThyDragDropEvent) {
        moveItemInArray(event.containerItems, event.previousIndex, event.currentIndex);
    }
}

import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyList, ThyListItem } from 'ngx-tethys/list';

@Component({
    selector: 'thy-drag-drop-cdk-drag-drop',
    templateUrl: './cdk-drag-drop.component.html',
    imports: [ThyList, CdkDropList, ThyListItem, CdkDrag, ThyIcon]
})
export class ThyDragDropCdkDragDropExampleComponent implements OnInit {
    nodes = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    constructor() {}

    ngOnInit() {}

    drop(event: CdkDragDrop<string[]>) {
        console.log(event);
        moveItemInArray(this.nodes, event.previousIndex, event.currentIndex);
    }
}

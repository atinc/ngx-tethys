import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-drag-drop-cdk-drag-drop',
    templateUrl: './cdk-drag-drop.component.html',
    standalone: false
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

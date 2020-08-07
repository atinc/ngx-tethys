import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-list-sort',
    templateUrl: './sort.component.html'
})
export class ThyListSortExampleComponent implements OnInit {
    public ListItems: string[] = ['Sort Item 1', 'Sort Item 2', 'Sort Item 3', 'Sort Item 4', 'Sort Item 5', 'Sort Item 6'];

    constructor() {}

    ngOnInit() {}

    sort(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.ListItems, event.previousIndex, event.currentIndex);
    }
}

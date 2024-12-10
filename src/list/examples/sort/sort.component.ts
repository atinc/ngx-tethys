import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-list-sort',
    templateUrl: './sort.component.html',
    standalone: false
})
export class ThyListSortExampleComponent implements OnInit {
    public ListItems: string[] = ['Sort Item 1', 'Sort Item 2', 'Sort Item 3'];

    constructor() {}

    ngOnInit() {}

    sort(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.ListItems, event.previousIndex, event.currentIndex);
    }
}

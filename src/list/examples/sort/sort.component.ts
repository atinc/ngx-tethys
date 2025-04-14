import { Component, OnInit } from '@angular/core';
import { moveItemInArray, CdkDragDrop, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ThyList, ThyListItem } from 'ngx-tethys/list';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'app-list-sort',
    templateUrl: './sort.component.html',
    imports: [ThyList, ThyIcon, ThyListItem, CdkDrag, CdkDropList]
})
export class ThyListSortExampleComponent implements OnInit {
    public ListItems: string[] = ['Sort Item 1', 'Sort Item 2', 'Sort Item 3'];

    constructor() {}

    ngOnInit() {}

    sort(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.ListItems, event.previousIndex, event.currentIndex);
    }
}

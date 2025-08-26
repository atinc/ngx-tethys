import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-nav-sort-example',
    templateUrl: './sort.component.html',
    styleUrls: ['./sort.component.scss'],
    imports: [ThyNav, ThyNavItemDirective, ThyIcon, CdkDrag, CdkDropList]
})
export class ThyNavSortExampleComponent implements OnInit {
    public activeIndex = 0;

    public ListItems: string[] = ['Sort Item 1', 'Sort Item 2', 'Sort Item 3'];

    public navList = [
        { index: 0, name: 'Item 1', disabled: false },
        { index: 1, name: 'Item 2', disabled: false },
        { index: 2, name: 'Item 3', disabled: false },
        { index: 3, name: 'Item 4', disabled: true },
        { index: 4, name: 'Item 5', disabled: false },
        { index: 5, name: 'Item 6', disabled: false },
        { index: 6, name: 'Item 7', disabled: false },
        { index: 7, name: 'Item 8', disabled: false },
        { index: 8, name: 'Item 9', disabled: false },
        { index: 9, name: 'Item 10', disabled: false },
        { index: 10, name: 'Item 11', disabled: false },
        { index: 11, name: 'Item 12', disabled: false },
        { index: 12, name: 'Item 13', disabled: false }
    ];

    constructor() {}

    ngOnInit(): void {}

    sort(event: CdkDragDrop<any[]>) {
        console.log('===拖拽后===', event);
        moveItemInArray(this.navList, event.previousIndex, event.currentIndex);
    }

    sort2(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.ListItems, event.previousIndex, event.currentIndex);
    }
}

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

    movies = [
        'Episode I - The Phantom Menace',
        'Episode II - Attack of the Clones',
        'Episode III - Revenge of the Sith',
        'Episode IV - A New Hope',
        'Episode V - The Empire Strikes Back',
        'Episode VI - Return of the Jedi',
        'Episode VII - The Force Awakens',
        'Episode VIII - The Last Jedi',
        'Episode IX – The Rise of Skywalker'
    ];

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    }
}

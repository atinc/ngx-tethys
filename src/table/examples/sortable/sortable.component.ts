import { Component, OnInit } from '@angular/core';
import { ThySortDirection, ThyTableSortEvent } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-sortable-example',
    templateUrl: './sortable.component.html'
})
export class ThyTableSortableExampleComponent implements OnInit {
    public sortDirectionEnum = ThySortDirection;

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
    ];

    constructor() {}

    ngOnInit(): void {}

    onThyTableSortChange($event: ThyTableSortEvent) {
        const { key, direction } = $event;
        this.sortData(key, direction);
    }

    onThyTableColumnSortChange($event: ThyTableSortEvent) {
        const { key, direction } = $event;
        this.sortData(key, direction);
    }

    sortData(key: string, direction: string) {
        if (direction === this.sortDirectionEnum.asc) {
            this.data.sort((a, b) => a[key] - b[key]);
        } else {
            this.data.sort((a, b) => b[key] - a[key]);
        }
    }
}

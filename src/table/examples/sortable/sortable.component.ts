import { Component, OnInit, signal } from '@angular/core';
import { ThyTable, ThyTableColumnComponent, ThyTableSortDirection, ThyTableSortEvent } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-sortable-example',
    templateUrl: './sortable.component.html',
    imports: [ThyTable, ThyTableColumnComponent]
})
export class ThyTableSortableExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
    ];

    sortBy = signal<string>('');

    sortDirection = signal<ThyTableSortDirection>(ThyTableSortDirection.default);

    constructor() {}

    ngOnInit(): void {}

    onSortChange(event: ThyTableSortEvent) {
        this.sortBy.set(event.key);
        this.sortDirection.set(event.direction);
        if (this.sortDirection() === ThyTableSortDirection.asc) {
            this.data.sort((pre, next) =>
                pre[this.sortBy() as keyof typeof pre].toString().localeCompare(next[this.sortBy() as keyof typeof next].toString())
            );
        } else if (this.sortDirection() === ThyTableSortDirection.desc) {
            this.data.sort((pre, next) =>
                next[this.sortBy() as keyof typeof next].toString().localeCompare(pre[this.sortBy() as keyof typeof pre].toString())
            );
        } else {
            this.data.sort((pre, next) => pre.id - next.id);
        }
    }
}

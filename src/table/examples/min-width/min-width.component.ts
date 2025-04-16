import { Component, OnInit } from '@angular/core';
import { ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-table-min-width-example',
    templateUrl: './min-width.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon]
})
export class ThyTableMinWidthExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}
}

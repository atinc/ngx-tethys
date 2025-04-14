import { Component, OnInit } from '@angular/core';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon, ThyAvatar]
})
export class ThyTableBasicExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}
}

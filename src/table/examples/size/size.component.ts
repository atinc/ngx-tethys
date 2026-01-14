import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyButton, ThyButtonGroup } from 'ngx-tethys/button';
import { ThyTable, ThyTableColumnComponent, ThyTableSize } from 'ngx-tethys/table';
import { ThyIcon } from 'ngx-tethys/icon';


@Component({
    selector: 'thy-table-size-example',
    templateUrl: './size.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyButtonGroup, FormsModule, ThyButton, ThyIcon]
})
export class ThyTableSizeExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    sizes = [
        {
            value: 'xs',
            height: 44
        },
        {
            value: 'sm',
            height: 48
        },
        {
            value: 'md',
            height: 52
        },
        {
            value: 'lg',
            height: 56
        },
        {
            value: 'xlg',
            height: 60
        }
    ];
    size: ThyTableSize = 'md';

    constructor() {}

    ngOnInit(): void {}
}

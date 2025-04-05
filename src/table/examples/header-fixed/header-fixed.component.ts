import { Component, OnInit } from '@angular/core';
import { ThyTable, ThyTableColumnComponent, ThyTableTheme } from 'ngx-tethys/table';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyAvatar } from 'ngx-tethys/avatar';
import { ThyRadioGroup } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-table-header-fixed-example',
    templateUrl: './header-fixed.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon, ThyAvatar, ThyRadioGroup, FormsModule]
})
export class ThyTableHeaderFixedExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 5, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 6, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 7, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 8, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    theme: ThyTableTheme = 'default';

    constructor() {}

    ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ThyTableTheme } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-theme-example',
    templateUrl: './theme.component.html',
    standalone: false
})
export class ThyTableThemeExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    theme: ThyTableTheme = 'default';

    constructor() {}

    ngOnInit(): void {}

    deleteItem(item: { id: number; name: string }) {
        console.log(`delete item(${item.id}, name: ${item.name}) successfully`);
    }
}

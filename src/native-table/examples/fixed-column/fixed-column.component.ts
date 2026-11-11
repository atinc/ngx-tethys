import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'thy-native-table-fixed-column-example',
    templateUrl: './fixed-column.component.html',
    imports: [ThyNativeTableModule, ThyInputModule, FormsModule, ThyIcon]
})
export class ThyNativeTableFixedColumnExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}
}

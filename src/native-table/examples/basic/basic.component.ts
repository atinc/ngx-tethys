import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyInput, ThyInputModule } from 'ngx-tethys/input';

@Component({
    selector: 'thy-native-table-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyNativeTableModule, ThyInputModule, FormsModule]
})
export class ThyNativeTableBasicExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}

    onSubmitAge(event: number, row: any): void {
        row.age = event;
        console.log('Submitted age for:', row);
    }
}

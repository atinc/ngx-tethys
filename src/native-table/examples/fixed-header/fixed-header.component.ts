import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyIcon } from 'ngx-tethys/icon';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'thy-native-table-fixed-header-example',
    templateUrl: './fixed-header.component.html',
    imports: [ThyNativeTableModule, ThyInputModule, FormsModule, ThyIcon]
})
export class ThyNativeTableFixedHeaderExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 5, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 6, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 7, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 8, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 9, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 10, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 11, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 12, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 13, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 14, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 15, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 16, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 17, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 18, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 19, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 20, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 21, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 22, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 23, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 24, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 25, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' }
    ];

    selection = new SelectionModel<any>(true);

    indeterminate = signal<boolean>(false);

    checkedAll = signal<boolean>(false);

    constructor() {}

    ngOnInit(): void {
        this.selection.changed.subscribe(change => {
            this.indeterminate.set(this.selection.selected.length > 0 && this.selection.selected.length < this.data.length);
            this.checkedAll.set(this.selection.selected.length === this.data.length);
        });
    }

    onCheckedAllChange(checked: boolean): void {
        console.log('Checked all:', checked);
        if (checked) {
            this.selection.select(...this.data);
        } else {
            this.selection.clear();
        }
    }

    onCheckedRowChange(checked: boolean, row: any): void {
        console.log('Checked:', checked, row);
        this.selection.toggle(row);
    }
}

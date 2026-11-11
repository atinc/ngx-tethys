import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableHeaderCellCheckState, ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyInputModule } from 'ngx-tethys/input';
import { ThyIcon } from 'ngx-tethys/icon';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'thy-native-table-checked-example',
    templateUrl: './checked.component.html',
    imports: [ThyNativeTableModule, ThyInputModule, FormsModule, ThyIcon]
})
export class ThyNativeTableCheckedExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    selection = new SelectionModel<any>(true);

    indeterminate = signal<boolean>(false);

    checkedAll = signal<ThyNativeTableHeaderCellCheckState>(false);

    constructor() {}

    ngOnInit(): void {
        this.selection.changed.subscribe(change => {
            if (this.selection.selected.length === this.data.length) {
                this.checkedAll.set(true);
            } else if (this.selection.selected.length === 0) {
                this.checkedAll.set(false);
            } else {
                this.checkedAll.set('indeterminate');
            }
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

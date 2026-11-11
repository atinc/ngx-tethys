import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeTableModule } from 'ngx-tethys/native-table';
import { ThyInput, ThyInputModule } from 'ngx-tethys/input';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'thy-native-table-drag-example',
    templateUrl: './drag.component.html',
    imports: [ThyNativeTableModule, ThyInputModule, FormsModule, CdkDrag, CdkDropList],
    styles: [
        `
            ::ng-deep .cdk-drag-preview {
                display: table;
            }
            ::ng-deep .cdk-drag-preview td {
                padding: 0 16px;
                vertical-align: middle;
            }
            ::ng-deep .cdk-drag-placeholder {
                opacity: 0;
            }
        `
    ]
})
export class ThyNativeTableDragExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}
    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    }
}

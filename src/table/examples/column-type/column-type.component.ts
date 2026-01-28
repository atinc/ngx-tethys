import { Component, OnInit, WritableSignal, model, signal } from '@angular/core';
import { ThyTable, ThyTableColumnComponent, ThyMultiSelectEvent, ThyRadioSelectEvent, ThySwitchEvent } from 'ngx-tethys/table';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyRadioGroup, ThyRadio } from 'ngx-tethys/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'thy-table-column-type-example',
    templateUrl: './column-type.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon, ThyRadioGroup, ThyRadio, FormsModule]
})
export class ThyTableColumnTypeExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
    ];

    selections: WritableSignal<{ id: number; name: string }[]> = signal([]);

    showTable = signal<boolean>(true);

    columnType = model<string>('index');

    ngOnInit(): void {
        this.selections.set([this.data[0]]);
    }

    onMultiSelectChange($event: ThyMultiSelectEvent) {
        this.selections.set($event.rows);
    }

    onRadioSelectChange($event: ThyRadioSelectEvent) {
        this.selections.set($event.row);
    }

    onSwitchChange($event: ThySwitchEvent) {}

    columnTypeChange() {
        this.showTable.set(false);
        setTimeout(() => {
            this.showTable.set(true);
        });
    }
}

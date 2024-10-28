import { Component, OnInit, inject } from '@angular/core';
import { ThyMultiSelectEvent, ThyRadioSelectEvent, ThySwitchEvent } from 'ngx-tethys/table';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'thy-table-column-type-example',
    templateUrl: './column-type.component.html'
})
export class ThyTableColumnTypeExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
    ];

    selections: { id: number; name: string }[] = [];

    showTable = true;

    columnType: string = 'index';

    ngOnInit(): void {
        this.selections = [this.data[0]];
    }

    onMultiSelectChange($event: ThyMultiSelectEvent) {
        this.selections = $event.rows;
    }

    onRadioSelectChange($event: ThyRadioSelectEvent) {
        this.selections = $event.row;
    }

    onSwitchChange($event: ThySwitchEvent) {}

    columnTypeChange() {
        this.showTable = false;
        setTimeout(() => {
            this.showTable = true;
        });
    }
}

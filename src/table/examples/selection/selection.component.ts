import { Component, OnInit, inject } from '@angular/core';
import { ThyMultiSelectEvent, ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-table-selection-example',
    templateUrl: './selection.component.html',
    imports: [ThyTable, ThyTableColumnComponent, ThyIcon, ThyButton]
})
export class ThyTableSelectionExampleComponent implements OnInit {
    private notifyService = inject(ThyNotifyService);

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', address: 'Hangzhou' }
    ];

    selections: { id: number; name: string }[] = [];

    updating = false;

    ngOnInit(): void {
        this.selections = [this.data[0]];
    }

    deleteItem(item: { id: number; name: string }) {
        console.log(`delete item(${item.id}, name: ${item.name}) successfully`);
    }

    onMultiSelectChange($event: ThyMultiSelectEvent) {
        this.selections = $event.rows;
    }

    updateItems() {
        this.updating = true;
        of(this.selections)
            .pipe(delay(1000))
            .subscribe(items => {
                this.updating = false;
                this.selections = [];
                this.notifyService.success(`update users(${items.map(item => item.name)}) successfully.`);
            });
    }
}

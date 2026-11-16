import { Component, signal } from '@angular/core';
import { ThyResizableDirective, ThyResizeEvent, ThyResizeHandle } from 'ngx-tethys/resizable';
import { ThyTable, ThyTableColumnComponent } from 'ngx-tethys/table';

@Component({
    selector: 'thy-resizable-table-example',
    templateUrl: './table.component.html',
    styleUrls: ['./table.style.scss'],
    imports: [ThyResizableDirective, ThyTable, ThyTableColumnComponent, ThyResizeHandle]
})
export class ThyResizableTableExampleComponent {
    className = 'thy-resizable';

    listOfData = signal([
        {
            key: '1',
            title: 'name',
            width: '180px',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            title: 'age',
            width: '180px',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            title: 'address',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ]);

    onResize({ width }: ThyResizeEvent, col: string): void {
        const data = this.listOfData().map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
        this.listOfData.set(data);
    }
}

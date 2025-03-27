import { Component } from '@angular/core';
import { ThyResizeEvent } from 'ngx-tethys/resizable';

@Component({
    selector: 'thy-resizable-table-example',
    templateUrl: './table.component.html',
    styleUrls: ['./table.style.scss'],
    standalone: false
})
export class ThyResizableTableExampleComponent {
    className = 'thy-resizable';

    listOfData = [
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
    ];

    onResize({ width }: ThyResizeEvent, col: string): void {
        this.listOfData = this.listOfData.map(e => (e.title === col ? { ...e, width: `${width}px` } : e));
    }
}

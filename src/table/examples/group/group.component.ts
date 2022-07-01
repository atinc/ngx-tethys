import { Component, OnInit } from '@angular/core';
import { ThyTableRowEvent } from 'ngx-tethys/table';

@Component({
    selector: 'thy-table-group-example',
    templateUrl: './group.component.html'
})
export class ThyTableGroupExampleComponent implements OnInit {
    public groups = [
        {
            id: '1',
            title: 'Product R&D',
            expand: true
        },
        {
            id: '2',
            title: 'Product Design',
            expand: false
        },
        {
            id: '3',
            title: 'DevOps',
            expand: false
        }
    ];

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', group_id: '1', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', group_id: '2', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', group_id: '1', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', group_id: '2', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', group_id: '3', address: 'Hangzhou' }
    ];

    disable = false;

    ngOnInit() {}

    addGroup() {
        this.groups = [
            ...this.groups,
            {
                id: '4',
                title: '新增的',
                expand: false
            }
        ];
        this.data = [
            ...this.data,
            { id: 6, name: '哈哈哈', age: 31, job: 'Engineer', group_id: '4', address: 'Yichuan Ningxia' },
            { id: 7, name: '嘻嘻嘻', age: 22, job: 'DevOps', group_id: '4', address: 'Hangzhou' }
        ];
        this.disable = true;
    }

    onRowClick(event: ThyTableRowEvent) {
        console.log(`[thy-table-group-example] clicked ${event.row.name}`);
    }
}

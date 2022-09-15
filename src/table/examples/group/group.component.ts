import { ThyTableDraggableEvent, ThyTableRowEvent } from 'ngx-tethys/table';
import { SafeAny } from 'ngx-tethys/types';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-table-group-example',
    templateUrl: './group.component.html',
    styles: [
        `
            .demo-name {
                padding-left: 20px;
            }
        `
    ]
})
export class ThyTableGroupExampleComponent implements OnInit {
    public groups = [
        {
            id: 'group1',
            title: 'Product R&D'
        },
        {
            id: 'group2',
            title: 'Product Design'
        },
        {
            id: 'group3',
            title: 'DevOps'
        }
    ];

    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', group_id: 'group1', address: 'Beijing Dong Sheng Technology' },
        { id: 2, name: 'James', age: 26, job: 'Designer', group_id: 'group2', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', group_id: 'group1', address: 'New Industrial Park, Shushan, Hefei, Anhui' },
        { id: 4, name: 'Elyse', age: 31, job: 'Engineer', group_id: 'group2', address: 'Yichuan Ningxia' },
        { id: 5, name: 'Jill', age: 22, job: 'DevOps', group_id: 'group3', address: 'Hangzhou' }
    ];

    ngOnInit() {}

    onRowClick(event: ThyTableRowEvent) {
        console.log(`[thy-table-group-example] clicked ${event.row.name}`);
    }

    dragDisabledPredicate = (event: SafeAny) => {
        return (
            this.groups.findIndex(item => {
                return item.id === event.id;
            }) < 0
        );
    };

    thyOnDraggableChange(event: ThyTableDraggableEvent) {
        console.log(event.models);
    }
}

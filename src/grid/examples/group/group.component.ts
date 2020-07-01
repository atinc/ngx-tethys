import { Component, OnInit } from '@angular/core';
import { ThyMultiSelectEvent, ThyGridRowEvent, helpers } from 'ngx-tethys';

@Component({
    selector: 'app-grid-group-example',
    templateUrl: './group.component.html'
})
export class ThyGridGroupExampleComponent implements OnInit {
    public groups = [
        {
            id: '111',
            title: '分组1'
        },
        {
            id: '222',
            title: '分组2'
        },
        {
            id: '333',
            title: '分组3'
        },
        {
            id: '444',
            title: '分组4'
        }
    ];
    public model = [
        {
            group_id: '111',
            id: '1',
            name: '张三',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            group_id: '111',
            id: '2',
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },
        {
            group_id: '111',
            id: '3',
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },

        {
            group_id: '222',
            id: '4',
            name: '张三2',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 0
        },
        {
            group_id: '222',
            id: '5',
            name: '李四2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        },
        {
            group_id: '222',
            id: '6',
            name: '王五2',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },

        {
            group_id: '333',
            id: '7',
            name: '张三3',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            group_id: '333',
            id: '8',
            name: '李四3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            group_id: '333',
            id: '9',
            name: '王五3',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },

        {
            group_id: '444',
            id: '10',
            name: '张三4',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1
        },
        {
            group_id: '444',
            id: '11',
            name: '李四4',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        },
        {
            group_id: '444',
            id: '12',
            name: '王五4',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 1
        }
    ];

    public size = 'default';

    ngOnInit() {}

    onRowClick(event: ThyGridRowEvent) {
        console.log(event);
    }
}

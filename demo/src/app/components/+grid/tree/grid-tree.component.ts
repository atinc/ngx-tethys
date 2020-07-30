import { Component, OnInit } from '@angular/core';
import { ThyMultiSelectEvent, ThyGridRowEvent, helpers } from 'ngx-tethys';

@Component({
    selector: 'demo-grid-tree',
    templateUrl: './grid-tree.component.html'
})
export class DemoGridTreeComponent implements OnInit {
    public model = [
        {
            id: 1,
            name: '张三',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1,
            items: [
                {
                    id: 11,
                    name: 'John Brown',
                    age: 42,
                    desc: 'New York No.',
                    items: [
                        {
                            id: 111,
                            name: 'John Brown',
                            age: 111,
                            desc: 'New York No.',
                            items: [
                                {
                                    id: 1111,
                                    name: 'John Brown',
                                    age: 1111,
                                    desc: 'New York No.',
                                    items: [
                                        {
                                            id: 11111,
                                            name: 'John Brown',
                                            age: 11111,
                                            desc: 'New York No.',
                                            items: [
                                                {
                                                    id: 111111,
                                                    name: 'John Brown',
                                                    age: 111111,
                                                    desc: 'New York No.'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: '李四',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0,
            items: [
                {
                    id: 22,
                    name: '李四22',
                    age: 10,
                    checked: false,
                    desc: '这是一条测试数据',
                    is_favorite: 0,
                    items: [
                        {
                            id: 222,
                            name: '李四222',
                            age: 10,
                            checked: false,
                            desc: '这是一条测试数据',
                            is_favorite: 0
                        }
                    ]
                }
            ]
        },
        {
            id: 3,
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据',
            is_favorite: 0
        }
    ];

    ngOnInit() {}
}

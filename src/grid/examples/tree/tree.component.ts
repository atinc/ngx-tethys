import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-grid-tree-example',
    templateUrl: './tree.component.html'
})
export class ThyGridTreeExampleComponent implements OnInit {
    public selections: any = [];

    public model = [
        {
            id: 1,
            name: '张三',
            age: 0,
            checked: true,
            desc: '',
            is_favorite: 1,
            children: [
                {
                    id: 11,
                    name: 'John Brown',
                    age: 42,
                    desc: 'New York No.',
                    children: [
                        {
                            id: 111,
                            name: 'John Brown',
                            age: 111,
                            desc: 'New York No.',
                            children: [
                                {
                                    id: 1111,
                                    name: 'John Brown',
                                    age: 1111,
                                    desc: 'New York No.',
                                    children: [
                                        {
                                            id: 11111,
                                            name: 'John Brown',
                                            age: 11111,
                                            desc: 'New York No.',
                                            children: [
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
            children: [
                {
                    id: 22,
                    name: '李四22',
                    age: 10,
                    checked: false,
                    desc: '这是一条测试数据',
                    is_favorite: 0,
                    children: [
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

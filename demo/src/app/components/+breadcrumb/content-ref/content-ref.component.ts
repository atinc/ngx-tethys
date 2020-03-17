import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-breadcrumb-content-ref',
    templateUrl: './content-ref.component.html'
})
export class BreadcrumbContentRefComponent implements OnInit {
    data = [
        {
            name: '首页'
        },
        {
            name: '产品介绍'
        },
        {
            name: '产品详情'
        },
        {
            name: '把大象装进一个冰箱需要做哪些工作'
        },
        {
            name: '打开冰箱'
        },
        {
            name: '放进大象'
        },
        {
            name: '介绍结束'
        }
    ];

    index = 1;

    constructor() {}

    ngOnInit() {}

    add() {
        this.data = [...this.data, { name: `文件内容${this.index++}` }];
    }

    remove() {
        this.data = [
            {
                name: '首页'
            },
            {
                name: '产品介绍'
            },
            {
                name: '产品详情'
            }
        ];
    }
}

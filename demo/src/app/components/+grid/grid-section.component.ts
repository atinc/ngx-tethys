import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
    selector: 'demo-grid-section',
    templateUrl: './grid-section.component.html'
})
export class DemoGridSectionComponent implements OnInit {

    private data: any[] = [];

    constructor() {

    }

    ngOnInit() {
        this.data = [{
            name: '张三',
            age: 10,
            checked: true,
            desc: '这是一条测试数据'
        },{
            name: '李四',
            age: 10,
            checked: true,
            desc: '这是一条测试数据'
        },{
            name: '王五',
            age: 10,
            checked: false,
            desc: '这是一条测试数据'
        }];
    }
}

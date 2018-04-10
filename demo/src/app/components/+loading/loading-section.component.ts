import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-loading-section',
    templateUrl: './loading-section.component.html',
    styleUrls:['./loading.scss']
})
export class DemoLoadingSectionComponent implements OnInit {

    public isDone = false;

    data = [{
        name: '张三',
        age: 10,
        checked: true,
        desc: '这是一条测试数据'
    }, {
        name: '李四',
        age: 10,
        checked: true,
        desc: '这是一条测试数据'
    }, {
        name: '王五',
        age: 10,
        checked: false,
        desc: '这是一条测试数据'
    }];

    ngOnInit() {
        setInterval(() => {
            this.isDone = true;
        }, 3000);
    }
}

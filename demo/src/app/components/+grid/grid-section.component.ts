import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
    selector: 'demo-grid-section',
    templateUrl: './grid-section.component.html'
})
export class DemoGridSectionComponent implements OnInit {

    public data: any[] = [];
    public pagination = { index: 1, size: 10, total: 100 };

    constructor() {

    }

    ngOnInit() {
        this.data = [{
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
    }

    onMultiSelectChange($event: any) {
        const event = $event.event;
        const rows = $event.rows;
    }

    onRadioSelectChange($event: any) {
        const event = $event.event;
        const row = $event.row;
    }

    onPageChange($event: any) {
        const event = $event.event;
        const page = $event.page;
    }
}

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
            desc: '啛啛喳喳错错错错错错错错'
        }, {
            name: '李四',
            age: 18,
            desc: '啛啛喳喳错错错错错错错错'
        }];
    }
}

import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
@Component({
    selector: 'app-tree-select-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTreeSelect]
})
export class ThyTreeSelectBasicExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}

    expandChange(status: boolean) {
        console.log(`当前 tree-select 组件的状态是：${status ? '展开' : '收起'}`);
    }
}

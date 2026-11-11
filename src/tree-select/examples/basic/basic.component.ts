import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tree-select-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyTreeSelect, FormsModule, CommonModule]
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

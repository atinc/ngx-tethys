import { Component, OnInit } from '@angular/core';
import { treeSelectNodes } from '../mock-data';

@Component({
    selector: 'demo-tree-select-size',
    templateUrl: './size.component.html'
})
export class DemoTreeSelectSizeComponent implements OnInit {
    public nodes = treeSelectNodes;

    public singleModel = {
        selectedValue: '010101',
        allowClear: false,
        disabled: false,
        showWholeName: true
    };

    constructor() {}

    ngOnInit() {}
}

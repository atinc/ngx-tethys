import { Component, OnInit } from '@angular/core';
import { treeSelectNodes } from '../mock-data';

@Component({
    selector: 'demo-tree-select-basic',
    templateUrl: './basic.component.html'
})
export class DemoTreeSelectBasicComponent implements OnInit {
    public nodes = treeSelectNodes;

    public singleModel = {
        selectedValue: '',
        allowClear: false,
        disabled: false,
        showWholeName: true,
        multi: false
    };

    constructor() {}

    ngOnInit() {}
}

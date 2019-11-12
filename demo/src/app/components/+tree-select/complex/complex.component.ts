import { Component, OnInit } from '@angular/core';
import { treeSelectNodes } from '../mock-data';
import { ThyTreeSelectNode } from 'ngx-tethys';

@Component({
    selector: 'demo-tree-select-complex',
    templateUrl: './complex.component.html'
})
export class DemoTreeSelectComplexComponent implements OnInit {
    public nodes = treeSelectNodes;

    public singleModel = {
        selectedValue: '010101',
        allowClear: false,
        disabled: false,
        showWholeName: true
    };

    constructor() {}

    ngOnInit() {}

    hiddenNodeFn(node: ThyTreeSelectNode) {
        return node.hidden;
    }

    disabledNodeFn(node: ThyTreeSelectNode) {
        return node.disable;
    }
}

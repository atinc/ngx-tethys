import { Component, OnInit } from '@angular/core';
import { disabledOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelectNode } from '../tree-select.class';

@Component({
    selector: 'app-tree-select-disabled-example',
    templateUrl: './disabled.component.html',
    standalone: false
})
export class ThyTreeSelectDisabledExampleComponent implements OnInit {
    public treeSelectNodes = disabledOptionTreeSelectData;

    public selectedValue = '';

    public isDisabled = false;

    constructor() {}

    ngOnInit() {}

    disabledNode() {
        this.treeSelectNodes[this.treeSelectNodes.length - 1].disabled = this.isDisabled;
    }

    disabledNodeFn(node: ThyTreeSelectNode) {
        return node.disabled;
    }
}

import { Component, OnInit } from '@angular/core';
import { hiddenOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelectNode } from '../tree-select.class';

@Component({
    selector: 'app-tree-select-hidden-example',
    templateUrl: './hidden.component.html',
    standalone: false
})
export class ThyTreeSelectHiddenExampleComponent implements OnInit {
    public treeSelectNodes = hiddenOptionTreeSelectData;

    public selectedValue = '';

    public isHidden = false;

    public hiddenNodeFn = (node: ThyTreeSelectNode) => node.fnHidden;

    constructor() {}

    ngOnInit() {}

    hiddenNode() {
        this.treeSelectNodes[this.treeSelectNodes.length - 1].hidden = this.isHidden;
    }
}

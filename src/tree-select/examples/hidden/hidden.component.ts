import { Component, OnInit } from '@angular/core';
import { hiddenOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelect, ThyTreeSelectNode } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'app-tree-select-hidden-example',
    templateUrl: './hidden.component.html',
    imports: [ThyTreeSelect, FormsModule, ThySwitch, ThyIcon]
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

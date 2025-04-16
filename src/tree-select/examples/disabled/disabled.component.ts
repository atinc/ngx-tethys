import { Component, OnInit } from '@angular/core';
import { disabledOptionTreeSelectData } from '../mock-data';
import { ThyTreeSelect, ThyTreeSelectNode } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyIcon } from 'ngx-tethys/icon';

@Component({
    selector: 'app-tree-select-disabled-example',
    templateUrl: './disabled.component.html',
    imports: [ThyTreeSelect, FormsModule, ThySwitch, ThyIcon]
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

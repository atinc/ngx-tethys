import { Component, OnInit } from '@angular/core';
import { ThyTreeSelectNode } from '../tree-select.class';
import { bigTreeNodes } from '../mock-data';
@Component({
    selector: 'thy-tree-virtual-height-example',
    templateUrl: './virtualHeight.component.html',
    standalone: false
})
export class ThyTreeSelectVirtualHeightExampleComponent implements OnInit {
    public selectedValue = '';
    public treeSelectNodes: ThyTreeSelectNode[] = bigTreeNodes;
    constructor() {}

    ngOnInit() {}
}

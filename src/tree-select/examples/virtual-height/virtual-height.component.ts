import { Component, OnInit } from '@angular/core';
import { bigTreeNodes } from '../mock-data';
import { ThyTreeSelect, ThyTreeSelectNode } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-tree-virtual-height-example',
    templateUrl: './virtual-height.component.html',
    imports: [ThyTreeSelect, FormsModule, CommonModule]
})
export class ThyTreeSelectVirtualHeightExampleComponent implements OnInit {
    public selectedValue = '';
    public treeSelectNodes: ThyTreeSelectNode[] = bigTreeNodes;
    constructor() {}

    ngOnInit() {}
}

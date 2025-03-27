import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-custom-node-example',
    templateUrl: './custom-node.component.html',
    standalone: false
})
export class ThyTreeSelectCustomNodeExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { treeSelectNodes } from '../mock-data';

@Component({
    selector: 'demo-tree-select-multiple',
    templateUrl: './multiple.component.html'
})
export class DemoTreeSelectMultipleComponent implements OnInit {
    public nodes = treeSelectNodes;

    multiModel = ['010101'];

    constructor() {}

    ngOnInit() {}
}

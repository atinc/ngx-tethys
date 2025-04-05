import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { ThyIcon } from 'ngx-tethys/icon';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-tree-select-custom-node-example',
    templateUrl: './custom-node.component.html',
    imports: [ThyTreeSelect, ThyIcon, FormsModule]
})
export class ThyTreeSelectCustomNodeExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

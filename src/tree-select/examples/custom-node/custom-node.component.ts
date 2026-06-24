import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { ThyIcon } from 'ngx-tethys/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tree-select-custom-node-example',
    templateUrl: './custom-node.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTreeSelect, ThyIcon, FormsModule, CommonModule]
})
export class ThyTreeSelectCustomNodeExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

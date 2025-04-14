import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { FormsModule } from '@angular/forms';
import { ThySwitch } from 'ngx-tethys/switch';
import { ThyIcon } from 'ngx-tethys/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tree-select-multiple-example',
    templateUrl: './multiple.component.html',
    imports: [ThyTreeSelect, FormsModule, ThySwitch, ThyIcon, CommonModule]
})
export class ThyTreeSelectMultipleExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public isMultiple = true;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

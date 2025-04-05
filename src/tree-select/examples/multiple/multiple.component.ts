import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
@Component({
    selector: 'app-tree-select-multiple-example',
    templateUrl: './multiple.component.html',
    imports: [ThyTreeSelect]
})
export class ThyTreeSelectMultipleExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public isMultiple = true;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

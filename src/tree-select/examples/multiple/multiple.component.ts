import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-multiple-example',
    templateUrl: './multiple.component.html'
})
export class ThyTreeSelectMultipleExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public isMultiple = true;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTreeSelectBasicExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public selectedValue = '';

    constructor() {}

    ngOnInit() {}
}

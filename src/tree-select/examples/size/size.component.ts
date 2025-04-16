import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';
import { ThyTreeSelect } from 'ngx-tethys/tree-select';
import { ThyButtonGroup, ThyButton } from 'ngx-tethys/button';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-tree-select-size-example',
    templateUrl: './size.component.html',
    imports: [ThyTreeSelect, ThyButtonGroup, ThyButton, NgClass]
})
export class ThyTreeSelectSizeExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];

    public currentSize = 'default';

    constructor() {}

    ngOnInit() {}
}

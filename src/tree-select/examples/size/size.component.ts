import { Component, OnInit } from '@angular/core';
import { basicTreeSelectData } from '../mock-data';

@Component({
    selector: 'app-tree-select-size-example',
    templateUrl: './size.component.html',
    standalone: false
})
export class ThyTreeSelectSizeExampleComponent implements OnInit {
    public treeSelectNodes = basicTreeSelectData;

    public btnSizes = ['xs', 'sm', 'md', 'default', 'lg'];

    public currentSize = 'default';

    constructor() {}

    ngOnInit() {}
}

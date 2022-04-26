import { Component, ViewChild } from '@angular/core';

import { bigTreeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-virtual-scrolling-example',
    templateUrl: './virtual-scrolling.component.html'
})
export class ThyTreeVirtualScrollingExampleComponent {
    bigTreeNodes = bigTreeNodes;

    @ViewChild('tree', { static: true }) tree: any;

    constructor() {}
}

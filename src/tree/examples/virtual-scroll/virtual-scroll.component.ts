import { Component, ViewChild } from '@angular/core';

import { bigTreeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-virtual-scroll-example',
    templateUrl: './virtual-scroll.component.html'
})
export class ThyTreeVirtualScrollExampleComponent {
    bigTreeNodes = bigTreeNodes;

    @ViewChild('tree', { static: true }) tree: any;

    constructor() {}
}

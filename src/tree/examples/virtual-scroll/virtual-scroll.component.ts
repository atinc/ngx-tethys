import { Component, ViewChild } from '@angular/core';

import { bigTreeNodes } from '../mocks';
import { ThyTreeDragDropEvent } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-virtual-scroll-example',
    templateUrl: './virtual-scroll.component.html',
    standalone: false
})
export class ThyTreeVirtualScrollExampleComponent {
    bigTreeNodes = bigTreeNodes;

    @ViewChild('tree', { static: true }) tree: any;

    constructor() {}

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

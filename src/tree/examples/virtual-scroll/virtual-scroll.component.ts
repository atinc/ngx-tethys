import { Component, ViewChild } from '@angular/core';
import { bigTreeNodes } from '../mocks';
import { ThyTree, ThyTreeDragDropEvent } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-virtual-scroll-example',
    templateUrl: './virtual-scroll.component.html',
    imports: [ThyTree]
})
export class ThyTreeVirtualScrollExampleComponent {
    bigTreeNodes = bigTreeNodes;

    @ViewChild('tree', { static: true }) tree: any;

    constructor() {}

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

import { Component, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { bigTreeNodes } from '../mocks';
import { ThyTree, ThyTreeDragDropEvent } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-virtual-scroll-example',
    templateUrl: './virtual-scroll.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTree]
})
export class ThyTreeVirtualScrollExampleComponent {
    bigTreeNodes = bigTreeNodes;

    readonly tree = viewChild<ThyTree>('tree');

    constructor() {}

    onDragDrop(event: ThyTreeDragDropEvent) {}
}

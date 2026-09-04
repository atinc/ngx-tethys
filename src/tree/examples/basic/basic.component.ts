import { Component, ChangeDetectionStrategy } from '@angular/core';
import { treeNodes } from '../mocks';
import { ThyTree } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTree]
})
export class ThyTreeBasicExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

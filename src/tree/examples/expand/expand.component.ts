import { Component, ChangeDetectionStrategy } from '@angular/core';
import { treeNodes } from '../mocks';
import { ThyTree } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-expand-example',
    templateUrl: './expand.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTree]
})
export class ThyTreeExpandExampleComponent {
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    constructor() {}
}

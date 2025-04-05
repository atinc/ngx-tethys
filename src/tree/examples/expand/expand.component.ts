import { Component } from '@angular/core';
import { treeNodes } from '../mocks';
import { ThyTree } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-expand-example',
    templateUrl: './expand.component.html',
    imports: [ThyTree]
})
export class ThyTreeExpandExampleComponent {
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    constructor() {}
}

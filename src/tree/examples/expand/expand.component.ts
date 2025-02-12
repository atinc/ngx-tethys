import { Component } from '@angular/core';
import { treeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-expand-example',
    templateUrl: './expand.component.html',
    standalone: false
})
export class ThyTreeExpandExampleComponent {
    treeNodes = JSON.parse(JSON.stringify(treeNodes));

    constructor() {}
}

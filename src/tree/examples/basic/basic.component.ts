import { Component } from '@angular/core';
import { treeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-basic-example',
    templateUrl: './basic.component.html'
})
export class ThyTreeBasicExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

import { Component } from '@angular/core';
import { treeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-template-example',
    templateUrl: './template.component.html'
})
export class ThyTreeTemplateExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

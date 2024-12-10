import { Component } from '@angular/core';
import { treeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-template-example',
    templateUrl: './template.component.html',
    standalone: false
})
export class ThyTreeTemplateExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

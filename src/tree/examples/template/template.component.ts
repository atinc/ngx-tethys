import { Component } from '@angular/core';
import { treeNodes } from '../mocks';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTree } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-template-example',
    templateUrl: './template.component.html',
    imports: [ThyTree, ThyIcon]
})
export class ThyTreeTemplateExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

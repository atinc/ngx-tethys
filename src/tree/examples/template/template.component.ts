import { Component, ChangeDetectionStrategy } from '@angular/core';
import { treeNodes } from '../mocks';
import { ThyIcon } from 'ngx-tethys/icon';
import { ThyTree } from 'ngx-tethys/tree';

@Component({
    selector: 'thy-tree-template-example',
    templateUrl: './template.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyTree, ThyIcon]
})
export class ThyTreeTemplateExampleComponent {
    treeNodes = treeNodes;

    constructor() {}
}

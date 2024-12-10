import { Component } from '@angular/core';
import { ThyTreeNode, ThyTreeNodeCheckState } from 'ngx-tethys/tree';
import { treeNodes } from '../mocks';

@Component({
    selector: 'thy-tree-checkable-example',
    templateUrl: './checkable.component.html',
    standalone: false
})
export class ThyTreeCheckableExampleComponent {
    treeNodes = treeNodes;

    constructor() {}

    checkStateResolve = (node: ThyTreeNode) => {
        const checkedNodes = node.children.filter(n => n.isChecked === ThyTreeNodeCheckState.checked);
        const unCheckedNodes = node.children.filter(n => n.isChecked === ThyTreeNodeCheckState.unchecked);
        if (checkedNodes.length === node.children.length) {
            return ThyTreeNodeCheckState.checked;
        } else if (unCheckedNodes.length === node.children.length) {
            return ThyTreeNodeCheckState.unchecked;
        } else {
            return ThyTreeNodeCheckState.indeterminate;
        }
    };
}

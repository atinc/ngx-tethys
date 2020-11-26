import { Injectable, OnDestroy } from '@angular/core';
import { ThyTreeNodeCheckState } from './tree.class';
import { Subject } from 'rxjs';
import { ThyTreeNode } from './tree-node.class';
import { coerceArray } from 'ngx-tethys/util/helpers';

function checkStateResolve(node: ThyTreeNode) {
    const checkedNodes = node.children.filter(n => n.isChecked === ThyTreeNodeCheckState.checked);
    const unCheckedNodes = node.children.filter(n => n.isChecked === ThyTreeNodeCheckState.unchecked);
    if (checkedNodes.length === node.children.length) {
        return ThyTreeNodeCheckState.checked;
    } else if (unCheckedNodes.length === node.children.length) {
        return ThyTreeNodeCheckState.unchecked;
    } else {
        return ThyTreeNodeCheckState.indeterminate;
    }
}

@Injectable()
export class ThyTreeService implements OnDestroy {
    public treeNodes: ThyTreeNode[];

    private checkStateResolve: (node: ThyTreeNode) => ThyTreeNodeCheckState = checkStateResolve;

    $statusChange = new Subject<ThyTreeFormatEmitEvent>();

    constructor() {}

    private _getParallelTreeNodes(nodes: ThyTreeNode[], list: ThyTreeNode[] = []) {
        (nodes || []).forEach(node => {
            list.push(node);
            this._getParallelTreeNodes(node.children || [], list);
        });
        return list;
    }

    setCheckStateResolve(resolve: (node: ThyTreeNode) => ThyTreeNodeCheckState = checkStateResolve) {
        this.checkStateResolve = resolve;
    }

    public resetSortedTreeNodes(treeNodes: ThyTreeNode[], parent?: ThyTreeNode) {
        treeNodes.forEach(node => {
            node.level = node.parentNode ? node.parentNode.level + 1 : 0;
            node.origin.children = node.children.map(n => n.origin);
            node.parentNode = parent;
            this.resetSortedTreeNodes(node.children, node);
        });
    }

    public getTreeNode(key: string | number) {
        const allNodes = this._getParallelTreeNodes(this.treeNodes);
        return allNodes.find(n => n.key === key);
    }

    public getExpandedNodes(): ThyTreeNode[] {
        const allNodes = this._getParallelTreeNodes(this.treeNodes);
        return allNodes.filter(n => n.isExpanded);
    }

    public getCheckedNodes(): ThyTreeNode[] {
        const allNodes = this._getParallelTreeNodes(this.treeNodes);
        return allNodes.filter(n => n.isChecked === ThyTreeNodeCheckState.checked);
    }

    public deleteTreeNode(node: ThyTreeNode) {
        const children = node.parentNode ? node.parentNode.children : this.treeNodes;
        const index = children.findIndex(n => n.key === node.key);
        if (index > -1) {
            children.splice(index, 1);
        }
    }

    public expandTreeNodes(keyOrKeys: string | number | (string | number)[]) {
        const keys = coerceArray(keyOrKeys);
        const needExpandNodes = this._getParallelTreeNodes(this.treeNodes).filter(node => {
            return keys.indexOf(node.key) > -1;
        });
        needExpandNodes.forEach(node => {
            node.setExpanded(true);
        });
    }

    public statusChanged() {
        return this.$statusChange.asObservable();
    }

    // 设置节点选中状态
    public setNodeChecked(node: ThyTreeNode, checked: boolean, propagateUp = true, propagateDown = true) {
        node.isChecked = checked ? ThyTreeNodeCheckState.checked : ThyTreeNodeCheckState.unchecked;
        node.origin.checked = checked;
        if (propagateDown && node.children) {
            node.children.forEach(subNode => {
                this.setNodeChecked(subNode, checked, false, true);
            });
        }
        if (propagateUp) {
            this.syncNodeCheckState(node.parentNode);
        }
    }

    public syncNodeCheckState(node: ThyTreeNode) {
        if (node) {
            node.isChecked = this.checkStateResolve(node);
            this.syncNodeCheckState(node.parentNode);
        }
    }

    ngOnDestroy(): void {
        this.$statusChange.complete();
        this.$statusChange = null;
    }
}

export interface ThyTreeFormatEmitEvent {
    eventName: string;
    node: ThyTreeNode;
    event?: MouseEvent | DragEvent;
}

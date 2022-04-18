import { coerceArray, isFunction } from 'ngx-tethys/util';
import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable, OnDestroy } from '@angular/core';

import { ThyTreeNode } from './tree-node.class';
import { ThyTreeNodeCheckState } from './tree.class';

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

type FlattenAllNodesCb = (treeNode: ThyTreeNode) => boolean;

@Injectable()
export class ThyTreeService implements OnDestroy {
    selectedNode!: ThyTreeNode;

    flattenNodes$ = new BehaviorSubject<ThyTreeNode[]>([]);

    flattenTreeNodes: ThyTreeNode[] = [];

    public treeNodes: ThyTreeNode[];

    private checkStateResolve: (node: ThyTreeNode) => ThyTreeNodeCheckState = checkStateResolve;

    $statusChange = new Subject<ThyTreeFormatEmitEvent>();

    constructor() {}

    public initializeTreeNodes(rootNodes: ThyTreeNode[]) {
        this.treeNodes = rootNodes;
        this.syncFlattenTreeNodes();
    }

    public syncFlattenTreeNodes() {
        this.flattenTreeNodes = this.getParallelTreeNodes(this.treeNodes, false);
        this.flattenNodes$.next(this.flattenTreeNodes);
        return this.flattenTreeNodes;
    }

    private getParallelTreeNodes(rootTrees: ThyTreeNode[] = this.treeNodes, flattenAllNodes: boolean | FlattenAllNodesCb = true) {
        const flattenTreeData: ThyTreeNode[] = [];
        function _getParallelTreeNodes(list: ThyTreeNode[]) {
            return list.forEach((treeNode, index) => {
                flattenTreeData.push(treeNode);
                const flattenAllNodesFlag = isFunction(flattenAllNodes) ? flattenAllNodes(treeNode) : flattenAllNodes;
                if (flattenAllNodesFlag || treeNode.isExpanded) {
                    _getParallelTreeNodes(treeNode.children);
                }
            });
        }
        _getParallelTreeNodes(rootTrees);
        return flattenTreeData;
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
        const allNodes = this.getParallelTreeNodes(this.treeNodes);
        return allNodes.find(n => n.key === key);
    }

    public getExpandedNodes(): ThyTreeNode[] {
        const allNodes = this.getParallelTreeNodes(this.treeNodes);
        return allNodes.filter(n => n.isExpanded);
    }

    public getCheckedNodes(): ThyTreeNode[] {
        const allNodes = this.getParallelTreeNodes(this.treeNodes);
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
        const needExpandNodes = this.getParallelTreeNodes(this.treeNodes).filter(node => {
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
        this._setNodeChecked(node, checked, propagateUp, propagateDown);
        this.syncFlattenTreeNodes();
    }

    private _setNodeChecked(node: ThyTreeNode, checked: boolean, propagateUp = true, propagateDown = true) {
        node.isChecked = checked ? ThyTreeNodeCheckState.checked : ThyTreeNodeCheckState.unchecked;
        node.origin.checked = checked;
        if (propagateDown && node.children) {
            node.children.forEach(subNode => {
                this._setNodeChecked(subNode, checked, false, true);
            });
        }
        if (propagateUp) {
            this._syncNodeCheckState(node.parentNode);
        }
    }

    public syncNodeCheckState(node: ThyTreeNode) {
        this._syncNodeCheckState(node);
        this.syncFlattenTreeNodes();
    }

    private _syncNodeCheckState(node: ThyTreeNode) {
        if (node) {
            node.isChecked = this.checkStateResolve(node);
            this._syncNodeCheckState(node.parentNode);
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

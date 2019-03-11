import { Injectable, OnDestroy } from '@angular/core';
import { helpers } from '../util';
import { ThyTreeNode } from './tree.class';
import { Subject } from 'rxjs';

@Injectable()
export class ThyTreeService implements OnDestroy {
    public treeNodes: ThyTreeNode[];

    $statusChange = new Subject<ThyTreeFormatEmitEvent>();

    constructor() { }

    private _getParallelTreeNodes(
        nodes: ThyTreeNode[],
        list: ThyTreeNode[] = []
    ) {
        nodes.forEach(node => {
            list.push(node);
            this._getParallelTreeNodes(node.children || [], list);
        });
        return list;
    }

    public resetSortedTreeNodes(
        treeNodes: ThyTreeNode[],
        parent?: ThyTreeNode
    ) {
        treeNodes.forEach(node => {
            node.level = node.parentNode ? node.parentNode.level + 1 : 0;
            node.origin.children = node.children.map(n => n.origin);
            node.parentNode = parent;
            this.resetSortedTreeNodes(node.children, node);
        });
    }

    public getTreeNode(key: string) {
        const allNodes = this._getParallelTreeNodes(this.treeNodes);
        return allNodes.find(n => n.key === key);
    }

    public getExpandedNodes(): ThyTreeNode[] {
        const allNodes = this._getParallelTreeNodes(this.treeNodes);
        return allNodes.filter(n => n.isExpanded);
    }

    public deleteTreeNode(node: ThyTreeNode) {
        const children = node.parentNode
            ? node.parentNode.children
            : this.treeNodes;
        const index = children.findIndex(n => n.key === node.key);
        if (index > -1) {
            children.splice(index, 1);
        }
    }

    statusChanged() {
        return this.$statusChange.asObservable();
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

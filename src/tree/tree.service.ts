import { Injectable } from '@angular/core';
import { helpers } from '../util';
import { ThyTreeNode } from './tree.class';

@Injectable()
export class ThyTreeService {

    private _treeNodesOfFlat: ThyTreeNode[] = [];

    public isCustomTemplate: boolean;

    public set treeNodesOfFlat(nodes: ThyTreeNode[]) {
        this._treeNodesOfFlat = this._getAllNodesOfFlat(nodes);
    }

    public get treeNodesOfFlat() {
        return this._treeNodesOfFlat;
    }

    constructor() {
    }

    private _getAllNodesOfFlat(nodes: ThyTreeNode[], list: ThyTreeNode[] = []) {
        nodes.forEach((node) => {
            list.push(node);
            this._getAllNodesOfFlat(node.children || [], list);
        });
        return list;
    }

    public setTreeTemplateToCustom() {
        this.isCustomTemplate = true;
    }

    public setNodeActive(node: ThyTreeNode, multiple: boolean) {
        if (!multiple) {
            const lastSelected = this.treeNodesOfFlat.find((item: ThyTreeNode) =>
                item.selected && item.key !== node.key
            );
            if (lastSelected) {
                lastSelected.selected = false;
            }
        }
        node.selected = !node.selected;
    }

    public deleteTreeNode(node: string | ThyTreeNode, nodes: ThyTreeNode[]) {
        const key = helpers.isString(node) ? node : (node as ThyTreeNode).key;
        nodes.forEach((item, index) => {
            if (item.key === key) {
                nodes.splice(index, 1);
            } else {
                this.deleteTreeNode(node, item.children || []);
            }
        });
    }

    public getSelectedNode(): ThyTreeNode {
        return this.treeNodesOfFlat.find((node) => node.selected);
    }

    public getSelectedNodes(): ThyTreeNode[] {
        return this.treeNodesOfFlat.filter((node) => node.selected);
    }

    public getParentNode(treeNode: ThyTreeNode): ThyTreeNode {
        return this.treeNodesOfFlat.find((node) => {
            return !!(node.children || []).find((item) => item.key === treeNode.key);
        });
    }

    public getExpandedNodes(): ThyTreeNode[] {
        return this.treeNodesOfFlat.filter((node) => node.expanded);
    }

}

import { Injectable } from '@angular/core';
import { helpers } from '../util';
import { ThyTreeNode } from './tree.class';
import { SortablejsOptions } from 'angular-sortablejs';

@Injectable()
export class ThyTreeService {

    private _treeNodesOfFlat: ThyTreeNode[] = [];

    public isCustomTemplate: boolean;

    public set treeNodesOfFlat(nodes: ThyTreeNode[]) {
        this._treeNodesOfFlat = this.getAllNodesOfFlat(nodes);
    }

    public get treeNodesOfFlat() {
        return this._treeNodesOfFlat;
    }

    constructor() {
    }

    public setTreeTemplateToCustom() {
        this.isCustomTemplate = true;
    }

    public getAllNodesOfFlat(nodes: ThyTreeNode[], list: ThyTreeNode[] = []) {
        nodes.forEach((node) => {
            list.push(node);
            this.getAllNodesOfFlat(node.children || [], list);
        });
        return list;
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

}

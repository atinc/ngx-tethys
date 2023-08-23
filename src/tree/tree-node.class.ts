import { helpers, isArray } from 'ngx-tethys/util';

import { ThyTreeNodeCheckState, ThyTreeNodeData } from './tree.class';
import { ThyTreeService } from './tree.service';

export class ThyTreeNode<T = any> {
    key?: number | string;

    title?: string;

    children: ThyTreeNode[];

    parentNode: ThyTreeNode;

    level = 0;

    origin: ThyTreeNodeData<T>;

    isExpanded: boolean;

    isChecked: ThyTreeNodeCheckState;

    isLoading: boolean;

    isDisabled: boolean;

    itemClass?: string[];

    private readonly service: ThyTreeService;

    get treeService(): ThyTreeService {
        if (this.service) {
            return this.service;
        } else if (this.parentNode) {
            return this.parentNode.treeService;
        }
    }

    constructor(node: ThyTreeNodeData, parent: ThyTreeNode = null, service?: ThyTreeService) {
        this.title = node.title;
        this.key = node.key;
        this.children = [];
        this.parentNode = parent;
        this.level = parent ? parent.level + 1 : this.level;
        this.origin = node;
        this.isDisabled = node.disabled || false;
        this.isExpanded = node.expanded || false;
        this.isChecked = node.checked ? ThyTreeNodeCheckState.checked : ThyTreeNodeCheckState.unchecked;
        this.isLoading = false;
        if (node.itemClass) {
            this.itemClass = isArray(node.itemClass) ? node.itemClass : [node.itemClass];
        }
        if (node.children) {
            node.children.forEach(childNode => {
                this.children.push(new ThyTreeNode(childNode, this, service));
            });
        }
        this.service = service;
        if (node.children && node.children.length && service) {
            this.isChecked = service.checkStateResolve(this);
        }
    }

    public setKey(key: string) {
        this.origin.key = key;
        this.key = key;
    }

    public setTitle(title: string) {
        this.origin.title = title;
        this.title = title;
    }

    public setLevel(level: number) {
        this.level = level;
    }

    private _setExpanded(expanded: boolean, propagate = false) {
        this.origin.expanded = expanded;
        this.isExpanded = expanded;
        if (propagate && this.children) {
            this.children.forEach(n => n._setExpanded(expanded, propagate));
        }
    }

    public setExpanded(expanded: boolean, propagate = false) {
        this._setExpanded(expanded, propagate);
        this.treeService.syncFlattenTreeNodes();
    }

    public setLoading(loading: boolean): void {
        this.isLoading = loading;
        this.treeService.syncFlattenTreeNodes();
    }

    public setChecked(checked: boolean, propagateUp = true, propagateDown = true) {
        this.treeService.setNodeChecked(this, checked, propagateUp, propagateDown);
    }

    public syncNodeCheckState() {
        this.treeService.syncNodeCheckState(this);
    }

    public getParentNode(): ThyTreeNode {
        return this.parentNode;
    }

    public getChildren(): ThyTreeNode[] {
        return this.children;
    }

    public addChildren(children: ThyTreeNodeData | ThyTreeNodeData[], index: number = -1): void {
        children = helpers.coerceArray(children);
        ((children as ThyTreeNodeData[]) || []).forEach((childNode: ThyTreeNodeData, i: number) => {
            if (index === -1) {
                this.children.push(new ThyTreeNode(childNode, this));
            } else {
                this.children.splice(index + i, 0, new ThyTreeNode(childNode, this, this.treeService));
            }
        });

        this.origin.children = this.getChildren().map(n => n.origin);
        this.setLoading(false);
        this.treeService.statusChange$.next({
            eventName: 'addChildren',
            node: this
        });
    }
}

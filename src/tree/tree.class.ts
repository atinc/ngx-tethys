import { Signal } from '@angular/core';
import { helpers, isArray } from 'ngx-tethys/util';
import { BehaviorSubject, Subject } from 'rxjs';

export enum ThyTreeNodeCheckState {
    unchecked = 0,
    checked = 1,
    indeterminate = 2
}

export enum ThyTreeDropPosition {
    in = 'in',
    before = 'before',
    after = 'after'
}

export interface ThyTreeNodeData<T = any> {
    key?: number | string;

    title?: string;

    icon?: string;

    iconStyle?: {
        [key: string]: any;
    };

    children?: ThyTreeNodeData<T>[];

    origin?: any;

    expanded?: boolean;

    disabled?: boolean;

    checked?: boolean;

    data?: T;

    itemClass?: string | string[];

    [key: string]: any;
}

export interface ThyTreeEmitEvent<T = any> {
    eventName: string;

    node?: ThyTreeNode<T>;

    event?: Event | any;

    dragNode?: ThyTreeNode<T>;

    targetNode?: ThyTreeNode<T>;
}

export interface ThyTreeBeforeDragStartContext {
    item: ThyTreeNode;
}

export interface ThyTreeBeforeDragDropContext {
    item?: ThyTreeNode;
    containerItems?: ThyTreeNode[];
    previousItem?: ThyTreeNode;
    previousContainerItems?: ThyTreeNode[];
    position?: ThyTreeDropPosition;
}

export interface ThyTreeDragDropEvent<T = any> {
    dragNode?: ThyTreeNode<T>;

    targetNode?: ThyTreeNode<T>;

    afterNode?: ThyTreeNode<T>;
}

export class ThyTreeIcons {
    expand?: string;
    collapse?: string;
}

export type ThyClickBehavior = 'default' | 'selectCheckbox';

export interface ThyTreeFormatEmitEvent {
    eventName: string;
    node: ThyTreeNode;
    event?: MouseEvent | DragEvent;
}

export interface IThyTreeService {
    selectedNode: ThyTreeNode;
    flattenTreeNodes: Signal<ThyTreeNode[]>;
    treeNodes: ThyTreeNode[];
    statusChange$: Subject<ThyTreeFormatEmitEvent> | null;
    initializeTreeNodes: (rootNodes: ThyTreeNodeData[]) => void;
    syncFlattenTreeNodes: () => void;
    setCheckStateResolve: (resolve: (node: ThyTreeNode) => ThyTreeNodeCheckState) => void;
    resetSortedTreeNodes: (treeNodes: ThyTreeNode[], parent?: ThyTreeNode) => void;
    getTreeNode: (key: string | number) => ThyTreeNode | undefined;
    getExpandedNodes: () => ThyTreeNode[];
    getCheckedNodes: () => ThyTreeNode[];
    deleteTreeNode: (node: ThyTreeNode) => void;
    addTreeNode: (node: ThyTreeNode, parent?: ThyTreeNode, index?: number) => void;
    expandTreeNodes: (keyOrKeys: string | number | (string | number)[] | true) => void;
    setNodeChecked: (node: ThyTreeNode, checked: boolean, propagateUp?: boolean, propagateDown?: boolean) => void;
    syncNodeCheckState: (node: ThyTreeNode) => void;
    checkStateResolve: (node: ThyTreeNode) => ThyTreeNodeCheckState;
}

export class ThyTreeNode<T = any> {
    key?: number | string;

    title?: string;

    children: ThyTreeNode[];

    parentNode?: ThyTreeNode | null;

    level = 0;

    origin: ThyTreeNodeData<T>;

    isExpanded: boolean;

    isChecked: ThyTreeNodeCheckState;

    isLoading: boolean;

    isDisabled: boolean;

    itemClass?: string[];

    private readonly service: IThyTreeService | undefined;

    get treeService(): IThyTreeService | undefined {
        if (this.service) {
            return this.service;
        } else if (this.parentNode) {
            return this.parentNode.treeService;
        }
        return;
    }

    constructor(node: ThyTreeNodeData, parent: ThyTreeNode | null = null, service?: IThyTreeService) {
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
        this.treeService?.syncFlattenTreeNodes();
    }

    public setLoading(loading: boolean): void {
        this.isLoading = loading;
        this.treeService?.syncFlattenTreeNodes();
    }

    public setChecked(checked: boolean, propagateUp = true, propagateDown = true) {
        this.treeService?.setNodeChecked(this, checked, propagateUp, propagateDown);
    }

    public syncNodeCheckState() {
        this.treeService?.syncNodeCheckState(this);
    }

    public getParentNode(): ThyTreeNode | null | undefined {
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
        this.treeService?.statusChange$?.next({
            eventName: 'addChildren',
            node: this
        });
    }
}

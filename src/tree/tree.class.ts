import { helpers } from '../util';
import { ThyTreeService } from './tree.service';

export interface ThyTreeNodeData {
    key?: number | string;

    title?: string;

    icon?: string;

    iconStyle?: {
        [key: string]: any;
    };

    children?: ThyTreeNodeData[];

    origin?: any;

    expanded?: boolean;

    edited?: boolean;

    disabled?: boolean;

    [key: string]: any;
}

export class ThyTreeNode {
    key?: number | string;

    title?: string;

    children: ThyTreeNode[];

    parentNode: ThyTreeNode;

    level = 0;

    origin: ThyTreeNodeData;

    isExpanded: boolean;

    isLoading: boolean;

    isDisabled: boolean;

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
        this.key = node.key || null;
        this.children = [];
        this.parentNode = parent;
        this.level = parent ? this.level + 1 : this.level;
        this.origin = node;
        this.isDisabled = node.disabled || false;
        this.isExpanded = node.expanded || false;
        this.isLoading = false;
        if (node.children) {
            node.children.forEach(childNode => {
                this.children.push(new ThyTreeNode(childNode, this));
            });
        }
        this.service = service;
    }

    public setKey(key: string) {
        this.origin.key = key;
        this.key = key;
    }

    public setTitle(title: string) {
        this.origin.title = title;
        this.title = title;
    }

    public setExpanded(expanded: boolean) {
        this.origin.expanded = expanded;
        this.isExpanded = expanded;
    }

    public setLoading(loading: boolean): void {
        this.isLoading = loading;
    }

    public getParentNode(): ThyTreeNode {
        return this.parentNode;
    }

    public getChildren(): ThyTreeNode[] {
        return this.children;
    }

    public addChildren(
        children: ThyTreeNodeData | ThyTreeNodeData[],
        index: number = -1
    ): void {
        if (!helpers.isArray(children)) {
            children = [children];
        }
        ((children as ThyTreeNodeData[]) || []).forEach(
            (childNode: ThyTreeNodeData, i: number) => {
                if (index === -1) {
                    this.children.push(new ThyTreeNode(childNode, this));
                } else {
                    this.children.splice(
                        index + i,
                        0,
                        new ThyTreeNode(childNode, this)
                    );
                }
            }
        );

        this.origin.children = this.getChildren().map(n => n.origin);
        this.setLoading(false);
        this.treeService.$statusChange.next({
            'eventName': 'addChildren',
            'node': this
        });
    }
}

export interface ThyTreeEmitEvent {
    eventName: string;

    node?: ThyTreeNode;

    event?: Event | any;

    dragNode?: ThyTreeNode;

    targetNode?: ThyTreeNode;
}

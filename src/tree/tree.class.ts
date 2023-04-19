import { ThyDragDropEvent } from 'ngx-tethys/drag-drop';

import { ThyTreeNode } from './tree-node.class';

export enum ThyTreeNodeCheckState {
    unchecked = 0,
    checked = 1,
    indeterminate = 2
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

export interface ThyTreeDragDropEvent<T = any> {
    event?: ThyDragDropEvent;

    currentIndex?: number;

    dragNode?: ThyTreeNode<T>;

    targetNode?: ThyTreeNode<T>;

    afterNode?: ThyTreeNode<T>;
}

export class ThyTreeIcons {
    expand?: string;

    collapse?: string;
}

export type ThyClickBehavior = 'default' | 'selectCheckbox';

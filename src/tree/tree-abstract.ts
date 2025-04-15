import { InjectionToken } from '@angular/core';
import { ThyTreeBeforeDragDropContext, ThyTreeBeforeDragStartContext, ThyTreeDragDropEvent, ThyTreeIcons, ThyTreeNode } from './tree.class';

export interface ThyTreeAbstractComponent {
    thyMultiple: boolean;
    thyDraggable: boolean;
    thyShowExpand: boolean;
    treeNodes: ThyTreeNode[];
    thyIcons: ThyTreeIcons;
    thyBeforeDragStart(e: ThyTreeBeforeDragStartContext): boolean;
    thyBeforeDragDrop(e: ThyTreeBeforeDragDropContext): boolean;
    onDragDrop(event: ThyTreeDragDropEvent): void;
    selectTreeNode(node: ThyTreeNode): void;
    toggleTreeNode(node: ThyTreeNode): void;
    isShowExpand(node: ThyTreeNode): boolean;
    trackByFn(number: string, node: ThyTreeNode): string | number;
    isSelected(node: ThyTreeNode): boolean;
}

export const THY_TREE_ABSTRACT_TOKEN = new InjectionToken<ThyTreeAbstractComponent>('thy-tree-abstract-token');

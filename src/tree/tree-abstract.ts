import { ThyDragDropEvent, ThyDragOverEvent, ThyDragStartEvent } from 'ngx-tethys/drag-drop';
import { InjectionToken } from '@angular/core';
import { ThyTreeNode } from './tree-node.class';
import { ThyTreeIcons } from './tree.class';

export interface ThyTreeAbstractComponent {
    thyMultiple: boolean;
    thyDraggable: boolean;
    thyShowExpand: boolean;
    treeNodes: ThyTreeNode[];
    thyIcons: ThyTreeIcons;
    beforeDragOver(event: ThyDragOverEvent<ThyTreeNode>): boolean;
    thyBeforeDragStart(e: ThyDragStartEvent): boolean;
    thyBeforeDragDrop(e: ThyDragDropEvent): boolean;
    onDragDrop(event: ThyDragDropEvent<ThyTreeNode>): void;
    onDragStart(event: ThyDragStartEvent<ThyTreeNode>): void;
    selectTreeNode(node: ThyTreeNode): void;
    toggleTreeNode(node: ThyTreeNode): void;
    isShowExpand(node: ThyTreeNode): boolean;
    trackByFn(number: string, node: ThyTreeNode): string | number;
    isSelected(node: ThyTreeNode): boolean;
}

export const THY_TREE_ABSTRACT_TOKEN = new InjectionToken<ThyTreeAbstractComponent>('thy-tree-abstract-token');

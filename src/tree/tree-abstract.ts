import { InjectionToken, InputSignal, Signal } from '@angular/core';
import { ThyTreeNode } from './tree.class';
import { ThyTreeBeforeDragDropContext, ThyTreeBeforeDragStartContext, ThyTreeDragDropEvent, ThyTreeIcons } from './tree.class';

export interface ThyTreeAbstractComponent {
    thyMultiple: InputSignal<boolean>;
    thyDraggable: InputSignal<boolean>;
    thyShowExpand: InputSignal<boolean>;
    treeNodes: ThyTreeNode[];
    icons: Signal<ThyTreeIcons>;
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

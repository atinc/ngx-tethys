import { Pipe, PipeTransform } from '@angular/core';
import { ThyTreeNode } from './tree.class';
import { ThyTreeBeforeDragStartContext } from './tree.class';

/**
 * @private
 */
@Pipe({
    name: 'treeNodeDraggable'
})
export class ThyTreeNodeDraggablePipe implements PipeTransform {
    transform(node: ThyTreeNode, beforeDragStart: (e: ThyTreeBeforeDragStartContext) => boolean): boolean {
        if (beforeDragStart) {
            const draggable = beforeDragStart({ item: node } as ThyTreeBeforeDragStartContext);
            return draggable;
        } else {
            return true;
        }
    }
}

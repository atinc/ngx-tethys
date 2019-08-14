import { Component, OnInit } from '@angular/core';
import * as data from './tree-mock.json';
import { ThyTreeNode } from 'ngx-tethys';
import { ThyDragDropEvent, ThyDropPosition } from 'ngx-tethys/drag-drop/drag-drop.class.js';

@Component({
    selector: 'app-demo-tree-basic',
    templateUrl: './tree-basic.component.html'
})
export class DemoTreeBasicComponent implements OnInit {
    treeNodes = data.default;

    draggable = true;

    constructor() {}

    ngOnInit(): void {}

    showExpand(node: ThyTreeNode) {
        return node.origin.type !== 'member';
    }

    beforeDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        return !(event.item.origin.name === '未分配部门');
    }

    onDragDrop(event: ThyDragDropEvent<ThyTreeNode>) {
        let afterId: string;
        const suiteId: string = event.previousItem.origin._id;
        const parenId: string =
            event.position === ThyDropPosition.in ? event.item.origin._id : event.item.parentNode.origin._id;
        const newIndex = event.currentIndex;
        if (newIndex === 0) {
            afterId = '';
        } else {
            afterId = event.containerItems[event.currentIndex - 1].origin._id;
        }
    }
}

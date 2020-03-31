import { Component, OnInit, ContentChild, ViewChild } from '@angular/core';
import * as data from './tree-mock.json';
import { ThyTreeNode, ThyTreeComponent, ThyTreeEmitEvent } from 'ngx-tethys';
import { ThyDragDropEvent, ThyDropPosition } from 'ngx-tethys/drag-drop/drag-drop.class.js';

@Component({
    selector: 'app-demo-tree-basic',
    templateUrl: './tree-basic.component.html'
})
export class DemoTreeBasicComponent implements OnInit {
    treeNodes = JSON.parse(JSON.stringify(data.default));

    addNodes = [];

    options = {
        draggable: true,
        checkable: false,
        treeIcons: { expand: 'minus-square', collapse: 'plus-square' },
        multiple: false
    };

    dataText: any;

    @ViewChild('tree') treeComponent: ThyTreeComponent;

    constructor() {}

    ngOnInit(): void {}

    showExpand(node: ThyTreeNode) {
        return node.origin.type !== 'member';
    }

    onClick(event: ThyTreeEmitEvent) {
        const selected = event.node;
        this.dataText = selected ? { key: selected.key, title: selected.title } : {};
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

    getRootNodes() {
        this.dataText = this.treeComponent.getRootNodes().map(n => {
            return {
                key: n.key,
                title: n.title
            };
        });
    }

    getSelectedNode() {
        const selected = this.treeComponent.getSelectedNode();
        this.dataText = selected ? { key: selected.key, title: selected.title } : {};
    }

    getSelectedNodes() {
        this.dataText = this.treeComponent.getSelectedNodes().map(n => {
            return {
                key: n.key,
                title: n.title
            };
        });
    }

    getExpandedNodes() {
        this.dataText = this.treeComponent.getExpandedNodes().map(n => {
            return {
                key: n.key,
                title: n.title
            };
        });
    }

    getCheckedNodes() {
        this.dataText = this.treeComponent.getCheckedNodes().map(n => {
            return {
                key: n.key,
                title: n.title
            };
        });
    }

    expandAllNodes() {
        this.treeComponent.expandAllNodes();
    }

    collapsedAllNodes() {
        this.treeComponent.collapsedAllNodes();
    }

    add() {
        this.treeNodes = JSON.parse(JSON.stringify(data.default));
        this.addNodes.push({
            key: new Date().getTime(),
            title: '新增的部门 ' + this.addNodes.length
        });
        this.treeNodes[0].children = [...this.treeNodes[0].children, ...this.addNodes];
    }
}

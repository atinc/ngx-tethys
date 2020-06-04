import { Component, OnInit, ViewChild } from '@angular/core';
import * as data from '../tree-mock.json';
import { ThyTreeNode, ThyTreeComponent, ThyTreeEmitEvent, ThyTreeNodeData } from 'ngx-tethys';

@Component({
    selector: 'app-demo-tree-async',
    templateUrl: './tree-async.component.html'
})
export class DemoTreeAsyncComponent implements OnInit {
    mockData = data as ThyTreeNodeData[];

    treeNodes = this.mockData.map(item => {
        return { ...item, children: [], expanded: false };
    });

    @ViewChild('tree', { static: true }) treeComponent: ThyTreeComponent;

    constructor() {}

    ngOnInit(): void {}

    showExpand(node: ThyTreeNode) {
        return node.origin.type !== 'member';
    }

    onExpandChange(event: ThyTreeEmitEvent) {
        setTimeout(() => {
            if (event.node.getChildren().length === 0) {
                const children = this.mockData.find(n => n.key === event.node.key).children;
                children.forEach(node => {
                    node.checked = event.node.origin.checked;
                });
                event.node.addChildren(children);
            }
        }, 2000);
    }
}

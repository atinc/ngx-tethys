import { Component, ViewChild, TemplateRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyTreeNode } from '../../../../../src/tree/tree.class';
import { ThyTreeComponent } from '../../../../../src/tree/tree.component';
import apiParameters from './api-parameters.json';
import { ThyDialog } from '../../../../../src/dialog';
@Component({
    selector: 'demo-tree-section',
    templateUrl: './tree-section.component.html',
    styleUrls: ['./tree-section.component.scss']
})
export class DemoTreeSectionComponent {
    @ViewChild('tree') treeComponent: ThyTreeComponent;

    public nodes: any = [
        {
            id: 1,
            name: 'root1',
            children: [{ id: 2, name: 'child1' }, { id: 3, name: 'child2' }]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [{ id: 7, name: 'subsub' }]
                }
            ]
        }
    ];

    public treeNodes: any[] = [
        {
            key: '01',
            title: '北京',
            icon: 'wtf wtf-drive-o',
            origin: { type: 1 },
            iconStyle: { color: 'red' },
            children: [
                {
                    key: '01001',
                    title: '海淀',
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '西二旗',
                            title: '西二旗',
                            icon: 'wtf wtf-file-text'
                        },
                        {
                            key: '西三旗',
                            title: '西三旗',
                            icon: 'wtf wtf-file-text'
                        }
                    ]
                },
                {
                    key: '01002',
                    title: 'child2',
                    icon: 'wtf wtf-file-text'
                }
            ]
        },
        {
            key: '02',
            title: 'root2',
            origin: { type: 1 },
            icon: 'wtf wtf-drive-o',
            expanded: true,
            children: []
        }
    ];

    public apiParameters = apiParameters;

    constructor(public thyDialog: ThyDialog) {}

    public addNode() {
        console.log(this.treeComponent.getSelectedNode());

        this.treeComponent.addTreeNode({
            key: '020011',
            title: 'new',
            edited: true
        },this.treeComponent.getSelectedNode());
    }

    public deleteNode(node) {
        this.treeComponent.deleteTreeNode(node);
    }

    public isEditable(node: ThyTreeNode) {
        return node.key === '02';
    }

    public isShowExpand(node) {
        return true;
    }

    public loadTreeNodes(event: { node: ThyTreeNode }) {
        event.node.setLoading(true);
        setTimeout(() => {
            event.node.addChildren([
                {
                    key: '08001001',
                    title: '11111111111111',
                    icon: 'wtf wtf-file-text'
                },
                {
                    key: '080010002',
                    title: '2222222222222222',
                    icon: 'wtf wtf-file-text'
                }
            ]);
        }, 3000);
    }

    public draggableNode(event) {
        console.log(event);
    }

    openDialogTree(template: TemplateRef<any>) {
        this.thyDialog.open(template);
    }

    public dialogLoadTreeNodes(event: { node: ThyTreeNode }) {
        event.node.addChildren([
            {
                key: '08001001',
                title: '11111111111111',
                icon: 'wtf wtf-file-text'
            },
            {
                key: '080010002',
                title: '2222222222222222',
                icon: 'wtf wtf-file-text'
            }
        ]);
    }
}

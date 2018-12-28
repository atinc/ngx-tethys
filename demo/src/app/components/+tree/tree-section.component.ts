import { Component, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { ThyTreeNode } from '../../../../../src/tree/tree.class';
import { ThyTreeComponent } from '../../../../../src/tree/tree.component';
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
            title: 'root1',
            icon: 'wtf wtf-drive-o',
            origin: { type: 1 },
            iconStyle: { color: 'red' },
            children: [
                {
                    key: '01001',
                    title: 'child1',
                    icon: 'wtf wtf-file-text',
                    children: [
                        {
                            key: '01001001',
                            title: 'child1',
                            icon: 'wtf wtf-file-text'
                        },
                        {
                            key: '010010002',
                            title: 'child2',
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

    public apiParameters = [
        {
            property: 'thyNodes',
            description: 'Tree展现所需的数据',
            type: 'Object[]',
            default: ''
        },
        {
            property: 'thyChildrenPropName',
            description: '子级数据的属性名',
            type: 'String',
            default: 'children'
        },
        {
            property: 'thyInstance',
            description:
                '灵活模式下需要注入的数据 （ instance可从 ng-template 定义 let instance="instance" 获取）',
            type: 'Object',
            default: ''
        },
        {
            property: '#treeNodeTemplate',
            description: '设置TreeNode的渲染模板',
            type: 'TemplateRef',
            default: ''
        },
        {
            property: '#treeNodeFlexibleTemplate',
            description: '设置灵活模式的TreeNode渲染模板',
            type: 'TemplateRef',
            default: ''
        }
    ];

    constructor() {}

    public addNode() {

        console.log(this.treeComponent.getSelectedNode());

        this.treeComponent.addTreeNode({
            key: '020011',
            title: 'new',
            edited: true
        });
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
}

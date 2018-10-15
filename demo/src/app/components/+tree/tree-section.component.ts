import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
@Component({
    selector: 'demo-tree-section',
    templateUrl: './tree-section.component.html',
    styleUrls: ['./tree-section.component.scss']
})
export class DemoTreeSectionComponent {

    public nodes: any = [
        {
            id: 1,
            name: 'root1',
            children: [
                { id: 2, name: 'child1' },
                { id: 3, name: 'child2' }
            ]
        },
        {
            id: 4,
            name: 'root2',
            children: [
                { id: 5, name: 'child2.1' },
                {
                    id: 6,
                    name: 'child2.2',
                    children: [
                        { id: 7, name: 'subsub' }
                    ]
                }
            ]
        }
    ];

    public treeNodes: any[] = [{
        key: '01',
        title: 'root1',
        icon: 'wtf wtf-drive-o',
        children: [
            {
                key: '01001',
                title: 'child1',
                icon: 'wtf wtf-file-text'
            },
            {
                key: '01002',
                title: 'child2',
                icon: 'wtf wtf-file-text'
            }
        ]
    }, {
        key: '02',
        title: 'root2',
        icon: 'wtf wtf-drive-o',
        children: [
            {
                key: '02001',
                title: 'child2.1',
                icon: 'wtf wtf-file-text'
            },
            {
                key: '02002',
                title: 'child2.2',
                icon: 'wtf wtf-file-text',
                children: [
                    {
                        key: '02002001',
                        title: 'subsub',
                        icon: 'wtf wtf-file-text'
                    }
                ]
            }
        ]
    }];

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
            description: '灵活模式下需要注入的数据 （ instance可从 ng-template 定义 let instance="instance" 获取）',
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

    constructor() {

    }

    public addNode() {
        this.treeNodes.push({
            key: '020011',
            title: 'new',
            edited: true
        });
    }
}

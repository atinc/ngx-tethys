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

    public apiParameters = [
        {
            property: 'thyNodes',
            description: 'Tree展现所需的数据',
            type: 'object[]',
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
        }
    ];

    constructor() {

    }
}

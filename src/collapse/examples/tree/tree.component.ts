import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-collapse-tree-example',
    templateUrl: './tree.component.html'
})
export class ThyCollapseTreeExampleComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    panels = [
        {
            active: true,
            name: '这是一级头部标题 1',
            children: [
                {
                    active: true,
                    name: '这是二级头部标题 1'
                },
                {
                    active: false,
                    name: '这是二级头部标题 2'
                }
            ]
        },
        {
            active: false,
            name: '这是一级头部标题 2'
        },
        {
            active: false,
            name: '这是一级头部标题 3'
        }
    ];
}

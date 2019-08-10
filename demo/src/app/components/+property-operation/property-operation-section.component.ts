import { Component, OnInit } from '@angular/core';
import { apiParameters } from './api-parameters';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoPropertyOperationBasicComponent } from './basic/basic.component';
import { DemoPropertyOperationGroupComponent } from './group/group.component';

@Component({
    selector: 'property-operation-section',
    templateUrl: './property-operation-section.component.html',
    styleUrls: ['./property-operation.scss']
})
export class DemoPropertyOperationSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Property Operation Basic',
            component: DemoPropertyOperationBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'basic.component.html',
                    content: require('!!raw-loader!./basic/basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./basic/basic.component.ts')
                }
            ]
        },
        {
            title: 'Property Operation Group',
            // description: `使用 thy-popover 指令弹出 Popover, 自动在绑定的元素上添加事件, 触发事件后弹出指定的组件或者模版 `,
            component: DemoPropertyOperationGroupComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'group.component.html',
                    content: require('!!raw-loader!./group/group.component.html')
                },
                {
                    type: 'ts',
                    name: 'group.component.ts',
                    content: require('!!raw-loader!./group/group.component.ts')
                }
            ]
        }
    ];

    apiParameters = apiParameters;

    constructor() {}

    ngOnInit() {}
}

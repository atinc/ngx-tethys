import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoTreeBasicComponent } from './basic/tree-basic.component';
import { DemoTreeIconsComponent } from './icons/tree-icons.component';

@Component({
    selector: 'demo-tree-section',
    templateUrl: './section.component.html'
})
export class DemoTreeSectionComponent {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoTreeBasicComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'tree-basic.component.html',
                    content: require('!!raw-loader!./basic/tree-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'tree-basic.component.ts',
                    content: require('!!raw-loader!./basic/tree-basic.component.ts')
                }
            ]
        },
        {
            title: '自定义Icons',
            component: DemoTreeIconsComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'tree-section.component.html',
                    content: require('!!raw-loader!./tree-section.component.html')
                },
                {
                    type: 'ts',
                    name: 'tree-section.component.ts',
                    content: require('!!raw-loader!./tree-section.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

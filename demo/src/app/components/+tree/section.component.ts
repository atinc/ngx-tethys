import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoTreeBasicComponent } from './basic/tree-basic.component';

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
        }
    ];

    constructor() {}
}

import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';

import { apiMentionTriggerParameters } from './api-parameters';
import { DemoMentionBasicComponent } from './basic/basic.component';
@Component({
    selector: 'demo-mention-section',
    templateUrl: './mention-section.component.html'
})
export class DemoMentionSectionComponent {
    apiMentionTriggerParameters = apiMentionTriggerParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '提及',
            component: DemoMentionBasicComponent,
            description: ``,
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
        }
    ];

    constructor() {}
}

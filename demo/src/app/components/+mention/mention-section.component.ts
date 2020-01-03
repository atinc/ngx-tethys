import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';

import { apiMentionParameters, apiMentionItemParameters } from './api-parameters';
import { DemoMentionBasicComponent } from './basic/basic.component';
import { DemoMentionContentEditableComponent } from './content-editable/content-editable.component';
import { DemoMentionRemoteComponent } from './remote/remote.component';
@Component({
    selector: 'demo-mention-section',
    templateUrl: './mention-section.component.html'
})
export class DemoMentionSectionComponent {
    apiMentionParameters = apiMentionParameters;

    apiMentionItemParameters = apiMentionItemParameters;

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
        },
        {
            title: '提及 (支持远程搜索)',
            component: DemoMentionRemoteComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'remote.component.html',
                    content: require('!!raw-loader!./remote/remote.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./remote/remote.component.ts')
                }
            ]
        },
        {
            title: '提及 Content Editable',
            component: DemoMentionContentEditableComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'content-editable.component.html',
                    content: require('!!raw-loader!./content-editable/content-editable.component.html')
                },
                {
                    type: 'ts',
                    name: 'content-editable.component.ts',
                    content: require('!!raw-loader!./content-editable/content-editable.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

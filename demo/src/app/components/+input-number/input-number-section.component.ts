import { Component, TemplateRef } from '@angular/core';
import { ThyNotifyService } from '../../../../../src/notify/notify.service';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoInputNumberBasicComponent } from './basic/input-number-basic.component';

@Component({
    selector: 'demo-input-number-section',
    templateUrl: './input-number-section.component.html'
})
export class DemoInputNumberSectionComponent {
    apiThyInputNumberParameters = [
        {
            property: 'thyInput',
            description: `thyInput`,
            type: 'String',
            default: 'primary'
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoInputNumberBasicComponent,
            description: `basic`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'input-number-basic.component.html',
                    content: require('!!raw-loader!./basic/input-number-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'input-number-basic.component.ts',
                    content: require('!!raw-loader!./basic/input-number-basic.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

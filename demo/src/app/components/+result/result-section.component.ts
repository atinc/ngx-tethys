import { Component, OnInit } from '@angular/core';
import { apiParameters } from './api-parameters';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoResultBasicComponent } from './basic/basic.component';

@Component({
    selector: 'result-section',
    templateUrl: './result-section.component.html'
})
export class DemoResultSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Result Basic',
            component: DemoResultBasicComponent,
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

    apiParameters = apiParameters;

    constructor() {}

    ngOnInit() {}
}

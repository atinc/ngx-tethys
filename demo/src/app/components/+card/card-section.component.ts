import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoCardBasicComponent } from './basic/basic.component';
import { DemoCardCustomHeaderComponent } from './custom-header/custom-header.component';
import { DemoCardContentScrollComponent } from './content-scroll/content-scroll.component';
import { apiCardParameters, apiHeaderParameters, apiContentParameters } from './api-parameters';
import { DemoCardDividedComponent } from './divided/divided.component';

@Component({
    selector: 'demo-card-section',
    templateUrl: './card-section.component.html'
})
export class DemoCardSectionComponent {
    title = '我的项目';

    apiCardParameters = apiCardParameters;

    apiHeaderParameters = apiHeaderParameters;

    apiContentParameters = apiContentParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoCardBasicComponent,
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
            title: '自定义头部',
            component: DemoCardCustomHeaderComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-header.component.html',
                    content: require('!!raw-loader!./custom-header/custom-header.component.html')
                },
                {
                    type: 'ts',
                    name: 'custom-header.component.ts',
                    content: require('!!raw-loader!./custom-header/custom-header.component.ts')
                }
            ]
        },
        {
            title: '内容区域滚动',
            component: DemoCardContentScrollComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'custom-header.component.html',
                    content: require('!!raw-loader!./content-scroll/content-scroll.component.html')
                },
                {
                    type: 'ts',
                    name: 'content-scroll.component.ts',
                    content: require('!!raw-loader!./content-scroll/content-scroll.component.ts')
                }
            ]
        },
        {
            title: '分割模式',
            component: DemoCardDividedComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'divided.component.html',
                    content: require('!!raw-loader!./divided/divided.component.html')
                },
                {
                    type: 'ts',
                    name: 'divided.component.ts',
                    content: require('!!raw-loader!./divided/divided.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

import { Component } from '@angular/core';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { DemoStatisticBasicComponent } from './basic/statistic-basic.component';
import { DemoStatisticCardComponent } from './card/statistic-card.component';

@Component({
    selector: 'demo-statistic',
    templateUrl: './statistic.component.html'
})
export class DemoStatisticComponent {
    public apiParameters = [
        {
            property: 'thyValue',
            description: '统计数值',
            type: 'number | string'
        },
        {
            property: 'thyPrefix',
            description: '前缀',
            type: 'string'
        },
        {
            property: 'thySuffix',
            description: '后缀',
            type: 'string'
        },
        {
            property: 'thyTitle',
            description: '标题',
            type: 'string'
        },
        {
            property: 'thyHasCard',
            description: '是否有背景card',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyColor',
            description: '主题颜色',
            type: 'string'
        },
        {
            property: 'thySize',
            description: '前缀和数值字体大小',
            type: 'string',
            default: '30px'
        },
        {
            property: 'thyType',
            description: '主题类型(primary | success | warning | danger | info)',
            type: 'string'
        }
    ];
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Statistic Basic',
            component: DemoStatisticBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'statistic-basic.component.html',
                    content: require('!!raw-loader!./basic/statistic-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'statistic-basic.component.ts',
                    content: require('!!raw-loader!./basic/statistic-basic.component.ts')
                }
            ]
        },
        {
            title: 'Statistic Card',
            component: DemoStatisticCardComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'statistic-card.component.html',
                    content: require('!!raw-loader!./card/statistic-card.component.html')
                },
                {
                    type: 'ts',
                    name: 'statistic-card.component.ts',
                    content: require('!!raw-loader!./card/statistic-card.component.ts')
                }
            ]
        }
    ];
    constructor() {}
}

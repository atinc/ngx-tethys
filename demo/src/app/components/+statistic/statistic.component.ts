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
            description: '数值内容',
            type: 'number | string'
        },
        {
            property: 'thyPrefix',
            description: '设置数值的前缀',
            type: 'string'
        },
        {
            property: 'thySuffix',
            description: '设置数值的后缀',
            type: 'string'
        },
        {
            property: 'thyTitle',
            description: '数值的标题',
            type: 'string'
        },
        {
            property: 'thyShape',
            description: '形式（card）',
            type: 'card',
            default: ''
        },
        {
            property: 'thyValueStyle',
            description: '设置数值的样式',
            type: 'string'
        },
        {
            property: 'thySize',
            description: '前缀和数值字体大小',
            type: 'default',
            default: 'default'
        },
        {
            property: 'thyColor',
            description: '主题颜色(primary，#fa8b7c)',
            type: 'primary | success | warning | danger | info 或 string'
        },
        {
            property: 'thyValueTemplate',
            description: '自定义数值展示',
            type: 'TemplateRef'
        },
        {
            property: 'thyPrefixTemplate',
            description: '自定义数值前缀展示',
            type: 'TemplateRef'
        },
        {
            property: 'thySuffixTemplate',
            description: '自定义数值后缀展示',
            type: 'TemplateRef'
        },
        {
            property: 'thyTitleTemplate',
            description: '自定义数值标题展示',
            type: 'TemplateRef'
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

import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoNavIconNavComponent } from './icon-nav/icon-nav.component';
import { apiIconNavParameters, apiIconNavLinkParameters } from './api-parameters';
import { DemoNavTypeComponent } from './type/type.component';
import { DemoNavFillComponent } from './fill/fill.component';
import { DemoNavHorizontalComponent } from './horizontal/horizontal.component';
import { DemoNavVerticalComponent } from './vertical/vertical.component';
@Component({
    selector: 'demo-nav-section',
    templateUrl: './nav-section.component.html'
})
export class DemoNavSectionComponent {
    apiIconNavParameters = apiIconNavParameters;
    apiIconNavLinkParameters = apiIconNavLinkParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '层级',
            description: `primary为一级导航，secondary为二级导航，thirdly为三级导航`,
            component: DemoNavTypeComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'type.component.html',
                    content: require('!!raw-loader!./type/type.component.html')
                },
                {
                    type: 'ts',
                    name: 'type.component.ts',
                    content: require('!!raw-loader!./type/type.component.ts')
                }
            ]
        },
        {
            title: '填充',
            description: `填充满父容器最大宽度`,
            component: DemoNavFillComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'fill.component.html',
                    content: require('!!raw-loader!./fill/fill.component.html')
                },
                {
                    type: 'ts',
                    name: 'fill.component.ts',
                    content: require('!!raw-loader!./fill/fill.component.ts')
                }
            ]
        },
        {
            title: '对其',
            description: `靠左中右展示`,
            component: DemoNavHorizontalComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'horizontal.component.html',
                    content: require('!!raw-loader!./horizontal/horizontal.component.html')
                },
                {
                    type: 'ts',
                    name: 'horizontal.component.ts',
                    content: require('!!raw-loader!./horizontal/horizontal.component.ts')
                }
            ]
        },
        {
            title: '纵向',
            description: `纵向展示`,
            component: DemoNavVerticalComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'vertical.component.html',
                    content: require('!!raw-loader!./vertical/vertical.component.html')
                },
                {
                    type: 'ts',
                    name: 'vertical.component.ts',
                    content: require('!!raw-loader!./vertical/vertical.component.ts')
                }
            ]
        },
        {
            title: '图标导航',
            description: `图标导航只适用于只有图标，没有文字的场景，目前有两种类型的场景，第一种是页面右上角的筛选，过滤，更多，第二种是详情页头部右侧的工具栏以及评论下方图标（secondary）, 默认的类型字体颜色是 888, Icon Link 间距是15px，Secondary类型的字体颜色是 cacaca, Icon Link 间距是10px`,
            component: DemoNavIconNavComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'icon-nav.component.html',
                    content: require('!!raw-loader!./icon-nav/icon-nav.component.html')
                },
                {
                    type: 'ts',
                    name: 'icon-nav.component.ts',
                    content: require('!!raw-loader!./icon-nav/icon-nav.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

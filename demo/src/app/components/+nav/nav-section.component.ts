import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoNavIconNavComponent } from './icon-nav/icon-nav.component';
import { apiIconNavParameters, apiIconNavLinkParameters } from './api-parameters';
@Component({
    selector: 'demo-nav-section',
    templateUrl: './nav-section.component.html'
})
export class DemoNavSectionComponent {
    apiIconNavParameters = apiIconNavParameters;
    apiIconNavLinkParameters = apiIconNavLinkParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '图标导航',
            component: DemoNavIconNavComponent,
            description: `图标导航只适用于只有图标，没有文字的场景，目前有两种类型的场景，第一种是页面右上角的筛选，过滤，更多，第二种是详情页头部右侧的工具栏以及评论下方图标（secondary）, 默认的类型字体颜色是 888, Icon Link 间距是15px，Secondary类型的字体颜色是 cacaca, Icon Link 间距是10px`,
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

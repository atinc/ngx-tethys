import { Component } from '@angular/core';

import { ThyNotifyService } from '../../../../../src/notify/notify.service';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoNotifyBasicComponent } from './basic/notify-basic.component';
import { DemoNotifyCustomHtmlComponent } from './custom-html/notify-custom-html.component';
import { DemoNotifyDetailComponent } from './detail/notify-detail.component';
import { DemoNotifyHoverComponent } from './hover/notify-hover.component';

@Component({
    selector: 'demo-notify-section',
    templateUrl: './notify-section.component.html'
})
export class DemoNotifySectionComponent {
    constructor(private notifyService: ThyNotifyService) {}

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoNotifyBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'notify-basic.component.html',
                    content: require('!!raw-loader!./basic/notify-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'notify-basic.component.ts',
                    content: require('!!raw-loader!./basic/notify-basic.component.ts')
                }
            ]
        },
        {
            title: 'hover关闭',
            component: DemoNotifyHoverComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'notify-hover.component.html',
                    content: require('!!raw-loader!./hover/notify-hover.component.html')
                },
                {
                    type: 'ts',
                    name: 'notify-hover.component.ts',
                    content: require('!!raw-loader!./hover/notify-hover.component.ts')
                }
            ]
        },
        {
            title: '带content的notify',
            component: DemoNotifyDetailComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'notify-detail.component.html',
                    content: require('!!raw-loader!./detail/notify-detail.component.html')
                },
                {
                    type: 'ts',
                    name: 'notify-detail.component.ts',
                    content: require('!!raw-loader!./detail/notify-detail.component.ts')
                }
            ]
        },
        {
            title: '自定义传入HTML',
            component: DemoNotifyCustomHtmlComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'notify-custom-html.component.html',
                    content: require('!!raw-loader!./custom-html/notify-custom-html.component.html')
                },
                {
                    type: 'ts',
                    name: 'notify-custom-html.component.ts',
                    content: require('!!raw-loader!./custom-html/notify-custom-html.component.ts')
                }
            ]
        }
    ];

    apiThyNotifyMethodParameters = [
        {
            property: 'title',
            description: `标题`,
            type: 'string',
            default: '-'
        },
        {
            property: 'content',
            description: `提示内容`,
            type: 'string',
            default: '-'
        },
        {
            property: 'detail',
            description: `提示内容的详情，是对内容的详情描述`,
            type: 'string',
            default: '-'
        },
        {
            property: 'options',
            description: `支持设置针对当前提示框的参数，见下方表格`,
            type: 'object',
            default: '-'
        }
    ];

    apiThyNotifyParameters = [
        {
            property: 'id',
            description: `提示通知的唯一标识符`,
            type: 'string'
        },
        {
            property: 'type',
            description: `弹出通知的类型`,
            type: `'blank' | 'success' | 'error' | 'warning' | 'info'`
        },
        {
            property: 'title',
            description: `标题`,
            type: 'string'
        },
        {
            property: 'content',
            description: `提示内容`,
            type: 'string'
        },
        {
            property: 'detail',
            description: `提示内容的详情，是对内容的详情描述`,
            type: 'string'
        },
        {
            property: 'html',
            description: `自定义传入html模板`,
            type: 'ElementRef'
        },
        {
            property: 'pauseOnHover',
            description: `鼠标移上时禁止自动移除`,
            type: 'boolean'
        },
        {
            property: 'duration',
            description: `持续时间（毫秒），当设置为0时不消失`,
            type: 'number'
        },
        {
            property: 'maxStack',
            description: `同一时间可展示的最大提示数量`,
            type: 'number'
        }
    ];
}

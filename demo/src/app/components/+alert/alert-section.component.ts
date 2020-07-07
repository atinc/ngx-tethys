import { Component, OnInit } from '@angular/core';

import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoAlertBasicComponent } from './basic/basic.component';
import { DemoAlertCloseComponent } from './close/close.component';
import { DemoAlertIconComponent } from './icon/icon.component';
import { DemoAlertMessageTemplateComponent } from './message-template/message-template.component';
import { DemoAlertWeakComponent } from './weak/weak.component';

@Component({
    selector: 'demo-alert-section',
    templateUrl: './alert-section.component.html',
    styleUrls: ['./alert.scss']
})
export class DemoAlertSectionComponent implements OnInit {
    //#region 参数说明
    public apiParameters = [
        {
            property: 'thyType',
            description: '置顶警告提示的类型',
            type: `'success' | 'warning' | 'danger' | 'info' | 'primary-week' | 'danger-strong' | 'secondary-strong';`,
            default: 'info'
        },
        {
            property: 'thyMessage',
            description: '警告提示的内容',
            type: 'string',
            default: ''
        },
        {
            property: 'thyIcon',
            description: '自定义图标类型，true/false 控制是否显示图标，当为字符串时，指定图标的名称',
            type: 'boolean | string',
            default: ''
        }
    ];

    //#endregion

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoAlertBasicComponent,
            description: `共有五种样式，success、warning、danger、info 和 primary-week'`,
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
            title: '自定义message',
            component: DemoAlertMessageTemplateComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'message-template.component.html',
                    content: require('!!raw-loader!./message-template/message-template.component.html')
                },
                {
                    type: 'ts',
                    name: 'message-template.component.ts',
                    content: require('!!raw-loader!./message-template/message-template.component.ts')
                }
            ]
        },
        {
            title: '图标',
            component: DemoAlertIconComponent,
            description: `可自定图标，控制图标是否显示或者显示的图标`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'icon.component.html',
                    content: require('!!raw-loader!./icon/icon.component.html')
                },
                {
                    type: 'ts',
                    name: 'icon.component.ts',
                    content: require('!!raw-loader!./icon/icon.component.ts')
                }
            ]
        },
        {
            title: '较弱的提示',
            component: DemoAlertWeakComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'weak.component.html',
                    content: require('!!raw-loader!./weak/weak.component.html')
                },
                {
                    type: 'ts',
                    name: 'weak.component.ts',
                    content: require('!!raw-loader!./weak/weak.component.ts')
                }
            ]
        },
        {
            title: '可关闭的警告框',
            component: DemoAlertCloseComponent,
            description: `显示关闭按钮，点击可关闭警告框`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'close.component.html',
                    content: require('!!raw-loader!./close/close.component.html')
                },
                {
                    type: 'ts',
                    name: 'close.component.ts',
                    content: require('!!raw-loader!./close/close.component.ts')
                }
            ]
        }
    ];

    ngOnInit() {}
}

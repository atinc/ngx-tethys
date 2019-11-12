import { Component, OnInit } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoAlertBasicComponent } from './basic/basic.component';
import { DemoAlertIconComponent } from './icon/icon.component';
import { DemoAlertBannerComponent } from './banner/banner.component';

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
            type: `'success' | 'warning' | 'danger' | 'info' | 'primary-week'`,
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
        }
        // {
        //     title: '顶部',
        //     component: DemoAlertBannerComponent,
        //     description: `在页面中置顶显示`,
        //     codeExamples: [
        //         {
        //             type: 'html',
        //             name: 'banner.component.html',
        //             content: require('!!raw-loader!./banner/banner.component.html')
        //         },
        //         {
        //             type: 'ts',
        //             name: 'banner.component.ts',
        //             content: require('!!raw-loader!./banner/banner.component.ts')
        //         }
        //     ]
        // }
    ];

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { DemoAvatarSizeSectionComponent } from './size/size.component';
import { DemoAvatarTypeSectionComponent } from './type/avatar-type.component';
import { DemoAvatarHasBadgeSectionComponent } from './has-badge/has-badge.component';
import { DemoAvatarRemoveSectionComponent } from './remove/remove.component';
import { LiveDemoCodeExample } from 'app/core/live-demo/live-demo.component';
import { DemoAvatarDisabledSectionComponent } from './disabled/disabled.component';

@Component({
    selector: 'demo-avatar-section',
    templateUrl: './avatar-section.component.html',
    styleUrls: ['./avatar-section.component.scss']
})
export class DemoAvatarSectionComponent implements OnInit {
    public liveDemos: LiveDemoCodeExample[] = [
        {
            title: '头像类型',
            component: DemoAvatarTypeSectionComponent,
            description: `支持俩种类型：图片和字符，其中字符型可以自动生成背景色。`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'avatar-type.component.html',
                    content: require('!!raw-loader!./type/avatar-type.component.html')
                },
                {
                    type: 'ts',
                    name: 'avatar-type.component.ts',
                    content: require('!!raw-loader!./type/avatar-type.component.ts')
                }
            ]
        },
        {
            title: '头像大小',
            component: DemoAvatarSizeSectionComponent,
            description: `可选择 22, 24, 30, 38, 48, 68, 110, 160 或者 sm(30pz) xs(24px) lg(48px)`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'size.component.html',
                    content: require('!!raw-loader!./size/size.component.html')
                },
                {
                    type: 'ts',
                    name: 'size.component.ts',
                    content: require('!!raw-loader!./size/size.component.ts')
                }
            ]
        },
        {
            title: '可移除头像',
            component: DemoAvatarRemoveSectionComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'remove.component.html',
                    content: require('!!raw-loader!./remove/remove.component.html')
                },
                {
                    type: 'ts',
                    name: 'remove.component.ts',
                    content: require('!!raw-loader!./remove/remove.component.ts')
                }
            ]
        },
        {
            title: '有徽标头像',
            component: DemoAvatarHasBadgeSectionComponent,
            description: `鼠标移动到头像时，头像右上出现移除的按钮，点击可移除`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'has-badge.component.html',
                    content: require('!!raw-loader!./remove/remove.component.html')
                },
                {
                    type: 'ts',
                    name: 'has-badge.component.ts',
                    content: require('!!raw-loader!./has-badge/has-badge.component.ts')
                }
            ]
        },
        {
            title: '禁用头像',
            component: DemoAvatarDisabledSectionComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'disabled.component.html',
                    content: require('!!raw-loader!./disabled/disabled.component.html')
                },
                {
                    type: 'ts',
                    name: 'disabled.component.ts',
                    content: require('!!raw-loader!./disabled/disabled.component.ts')
                }
            ]
        }
    ];

    public apiParameters = [
        {
            property: 'thySrc',
            description:
                '头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 avatarSrcTransform 方法实现转换',
            type: 'string',
            default: ''
        },
        {
            property: 'thyName',
            description:
                '人员名称（可设置自定义名称，需通过自定义服务 ThyAvatarService，重写 avatarNameTransform 方法去实现转换）',
            type: 'string',
            default: ''
        },
        {
            property: 'thyShowName',
            description: '是否展示人员名称',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyShowRemove',
            description: '是否展示移除按钮',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyOnRemove',
            description: '移除按钮的事件, 当 thyShowRemove 为 true 时起作用',
            type: 'Event',
            default: ''
        },
        {
            property: 'thySize',
            description: '头像大小，可选择  22, 24, 30, 38, 48, 68, 110, 160, sm: 30px, xs: 24px lg: 48',
            type: 'Number | String',
            default: '38'
        },
        {
            property: 'thyDisabled',
            description: '禁用',
            type: 'Boolean',
            default: 'false'
        }
    ];

    constructor() {}

    ngOnInit() {}
}

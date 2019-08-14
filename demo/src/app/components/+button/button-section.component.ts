import { Component, TemplateRef } from '@angular/core';
import { ThyNotifyService } from '../../../../../src/notify/notify.service';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoButtonBasicComponent } from './basic/button-basic.component';
import { DemoButtonPairComponent } from './pair/button-pair.component';
import { DemoButtonLinkComponent } from './link/button-link.component';
import { DemoButtonSizeComponent } from './size/button-size.component';
import { DemoButtonOutlineComponent } from './outline/button-outline.component';
import { DemoButtonSquareComponent } from './square/button-square.component';
import { DemoButtonLoadingComponent } from './loading/button-loading.component';
import { DemoButtonGroupComponent } from './group/button-group.component';
import { DemoButtonIconComponent } from './icon/button-icon.component';

@Component({
    selector: 'demo-button-section',
    templateUrl: './button-section.component.html'
})
export class DemoButtonSectionComponent {
    apiThyButtonParameters = [
        {
            property: 'thyButton',
            description: `按钮类型，类型为 'primary' | 'secondary' | 'outline-primary' | 'outline-default' | 'danger' | 'link' | 'link-secondary'`,
            type: 'String',
            default: 'primary'
        },
        {
            property: 'thyType',
            description: `和 thyButton 含义相同，一般使用 thyButton，为了减少参数输入, 设置按钮组件通过 thy-button 时，只能使用该参数控制类型`,
            type: 'String',
            default: 'primary'
        },
        {
            property: 'thySize',
            description: `按钮大小，目前可传的大小为：sm，md`,
            type: 'String',
            default: ''
        },
        {
            property: 'thySquare',
            description: `按钮圆角恢复正常的方形，可以通过在 buttonType 后加上 -square 达到同样的效果，比如设置按钮类型为 outline-primary-square`,
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyIcon',
            description: `按钮中显示的图标,比如 wtf-plus，默认字体前缀是 wtf, 如果使用其他字体，加上其他的字体前缀，比如 fa fa-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyLoading',
            description: `加载状态`,
            type: 'Boolean',
            default: ''
        },
        {
            property: 'thyLoadingText',
            description: `加载状态时显示的文案`,
            type: 'String',
            default: ''
        }
    ];

    apiThyButtonIconParameters = [
        {
            property: 'thyButtonIcon',
            description: `图标按钮的图标, 比如 wtf-plus，默认字体前缀是 wtf, 如果使用其他字体，加上其他的字体前缀，比如 fa fa-plus`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyIcon',
            description: `图标按钮的图标, 和 thyButtonIcon 类似，当使用 thy-button-icon 时，只能使用 thyIcon 设置图标`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyShape',
            description: `展示的形状，默认只显示字体图标图标，circle-dashed, circle-solid 展示成虚线,实线边框圆形图标, circle-thick-dashed, circle-thick-solid 边框加粗`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyTheme',
            description: `按钮展示类型，默认图标移上去显示主色， danger-weak 鼠标移上去显示 danger 红色`,
            type: 'String',
            default: ''
        },
        {
            property: 'thySize',
            description: `大小，xs | sm | lg | ''`,
            type: 'String',
            default: ''
        },
        {
            property: 'thyLight',
            description: `亮色，颜色更浅，适合左侧导航顶部的按钮`,
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyActive',
            description: `设置为选中状态`,
            type: 'Boolean',
            default: 'false'
        }
    ];

    apiThyButtonGroupParameters = [
        {
            property: 'thySize',
            description: `大小，xs | sm | md | lg`,
            type: 'String',
            default: 'md'
        },

        {
            property: 'thyType',
            description: `outline-default, outline-primary,必填`,
            type: 'String'
        },

        {
            property: 'thyClearMinWidth',
            description: `是否需要最小宽度，默认值为false`,
            type: 'String',
            default: 'false'
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoButtonBasicComponent,
            description: `按钮有四种类型：主按钮、信息按钮、警告按钮、危险按钮。主按钮在同一个操作区域最多出现一次。`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-basic.component.html',
                    content: require('!!raw-loader!./basic/button-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-basic.component.ts',
                    content: require('!!raw-loader!./basic/button-basic.component.ts')
                }
            ]
        },
        {
            title: '按钮对',
            description: `按钮对一般用于表单的确认, 取消, 同时也支持主按钮, 线框按钮, 按钮链接多个操作按钮在一起`,
            component: DemoButtonPairComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-pair.component.html',
                    content: require('!!raw-loader!./pair/button-pair.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-pair.component.ts',
                    content: require('!!raw-loader!./pair/button-pair.component.ts')
                }
            ]
        },
        {
            title: '加载状态',
            description: ``,
            component: DemoButtonLoadingComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-loading.component.html',
                    content: require('!!raw-loader!./loading/button-loading.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-pair.component.ts',
                    content: require('!!raw-loader!./loading/button-loading.component.ts')
                }
            ]
        },
        {
            title: '线框按钮',
            description: ``,
            component: DemoButtonOutlineComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-outline.component.html',
                    content: require('!!raw-loader!./outline/button-outline.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-outline.component.ts',
                    content: require('!!raw-loader!./outline/button-outline.component.ts')
                }
            ]
        },
        {
            title: '方形按钮',
            description: ``,
            component: DemoButtonSquareComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-square.component.html',
                    content: require('!!raw-loader!./square/button-square.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-square.component.ts',
                    content: require('!!raw-loader!./square/button-square.component.ts')
                }
            ]
        },
        {
            title: '按钮链接',
            description: ``,
            component: DemoButtonLinkComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-link.component.html',
                    content: require('!!raw-loader!./link/button-link.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-link.component.ts',
                    content: require('!!raw-loader!./link/button-link.component.ts')
                }
            ]
        },
        {
            title: '按钮大小',
            description: `按钮大小有4种, 分别为: xs = 24px, sm = 28px, md = 32px, default = 36px, lg = 44px，表单确认按钮为默认大小 36px, 以及页面的右上角操作，md 按钮主要用于头部导航操作区域。`,
            component: DemoButtonSizeComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-size.component.html',
                    content: require('!!raw-loader!./size/button-size.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-size.component.ts',
                    content: require('!!raw-loader!./size/button-size.component.ts')
                }
            ]
        },
        {
            title: '按钮组',
            description: ``,
            component: DemoButtonGroupComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-group.component.html',
                    content: require('!!raw-loader!./group/button-group.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-group.component.ts',
                    content: require('!!raw-loader!./group/button-group.component.ts')
                }
            ]
        },
        {
            title: '图标按钮',
            description: ``,
            component: DemoButtonIconComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'button-icon.component.html',
                    content: require('!!raw-loader!./icon/button-icon.component.html')
                },
                {
                    type: 'ts',
                    name: 'button-icon.component.ts',
                    content: require('!!raw-loader!./icon/button-icon.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

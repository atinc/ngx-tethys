import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoActionMenuBasicComponent } from './basic/basic.component';
import { DemoActionMenuGroupComponent } from './group/group.component';
import { DemoActionMenuItemComponent } from './item/item.component';

@Component({
    selector: 'demo-action-menu-section',
    templateUrl: './action-menu-section.component.html'
})
export class DemoActionMenuSectionComponent {
    toggleApiParameters = [
        {
            property: 'thyActionMenuToggle',
            description: '',
            type: 'ElementRef',
            default: ''
        },
        {
            property: 'thyAction',
            description: '触发事件',
            type: '"click" | "contextmenu"',
            default: 'click'
        },
        {
            property: 'thyStopPropagation',
            description: '阻止冒泡',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPlacement',
            description: '菜单显示位置',
            type: 'string',
            default: 'bottom right'
        },
        {
            property: 'thyContainerClass',
            description: 'overlay panel class',
            type: 'string',
            default: ''
        },
        {
            property: 'thyOriginActiveClass',
            description: '菜单打开时源元素class',
            type: 'string | string[]',
            default: ''
        }
    ];

    menuApiParameters = [
        {
            property: 'thyWidth',
            description: '设置菜单宽度',
            type: '',
            default: '240px'
        },
        {
            property: 'thyTheme',
            description: '菜单主题样式',
            type: '"default" | "group"',
            default: 'default'
        }
    ];

    itemApiParameters = [
        {
            property: 'thyActionMenuItem',
            description: '菜单项',
            type: 'ElementRef',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '菜单项禁用',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyType',
            description: '菜单项type',
            type: '"danger" | "success"',
            default: ''
        }
    ];

    dividerApiParameters = [
        {
            property: 'thyTitle',
            description: '分割线标题',
            type: 'string',
            default: ''
        },
        {
            property: 'thyType',
            description: '分割线类型',
            type: '"default" | "crossing"',
            default: 'default'
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoActionMenuBasicComponent,
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
            title: '分组下拉菜单',
            component: DemoActionMenuGroupComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'group.component.html',
                    content: require('!!raw-loader!./group/group.component.html')
                },
                {
                    type: 'ts',
                    name: 'group.component.ts',
                    content: require('!!raw-loader!./group/group.component.ts')
                }
            ]
        },
        {
            title: '下拉菜单项',
            component: DemoActionMenuItemComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'item.component.html',
                    content: require('!!raw-loader!./item/item.component.html')
                },
                {
                    type: 'ts',
                    name: 'item.component.ts',
                    content: require('!!raw-loader!./item/item.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

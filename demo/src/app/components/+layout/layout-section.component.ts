import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoLayoutBasicComponent } from './basic/basic.component';
import { DemoLayoutFullComponent } from './full/full.component';
import { DemoLayoutSidebarComponent } from './sidebar/sidebar.component';

@Component({
    selector: 'demo-layout-section',
    templateUrl: './layout-section.component.html',
    styleUrls: ['./layout-section.scss']
})
export class DemoLayoutSectionComponent {
    public thyLayoutApiParameters = [];

    public thyLayoutSidebarApiParameters = [
        {
            property: 'thyWidth',
            description: '宽度, 默认是 240px, 传入 lg 大小时宽度是300px',
            type: 'number | "lg"',
            default: ''
        },
        {
            property: 'thyIsolated',
            description: '是否和右侧隔离, 当为 true 是距右侧会有 margin, 同时边宽会去掉',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyHasBorderRight',
            description: '右侧是否有边框',
            type: 'boolean',
            default: 'true'
        },
        {
            property: 'thyIsDraggableWidth',
            description: '宽度',
            type: 'boolean',
            default: ''
        }
    ];

    public thyLayoutHeaderApiParameters = [
        {
            property: 'thyHasBorder',
            description: '底部是否有边框',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thySize',
            description: '头部大小',
            type: 'string',
            default: 'md | sm'
        },
        {
            property: 'thyTitle',
            description: '标题',
            type: 'string',
            default: ''
        },
        {
            property: 'thyIcon',
            description: '图标',
            type: 'string',
            default: ''
        },
        {
            property: 'thyIconPrefix',
            description: '图标前缀',
            type: 'string',
            default: 'wtf'
        }
    ];

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoLayoutBasicComponent,
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
            title: '完整使用',
            component: DemoLayoutFullComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'full.component.html',
                    content: require('!!raw-loader!./full/full.component.html')
                },
                {
                    type: 'ts',
                    name: 'full.component.ts',
                    content: require('!!raw-loader!./full/full.component.ts')
                }
            ]
        },
        {
            title: '侧边栏',
            component: DemoLayoutSidebarComponent,
            description: ``,
            codeExamples: [
                {
                    type: 'html',
                    name: 'sidebar.component.html',
                    content: require('!!raw-loader!./sidebar/sidebar.component.html')
                },
                {
                    type: 'ts',
                    name: 'sidebar.component.ts',
                    content: require('!!raw-loader!./sidebar/sidebar.component.ts')
                }
            ]
        }
    ];

    constructor() {}
}

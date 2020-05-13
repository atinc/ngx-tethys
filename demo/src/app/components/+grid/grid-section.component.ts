import { Component, OnInit } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoGridDefaultComponent } from './default/grid-default.component';
import { DemoGridBorderedComponent } from './bordered/grid-bordered.component';
@Component({
    selector: 'demo-grid-section',
    templateUrl: './grid-section.component.html'
})
export class DemoGridSectionComponent implements OnInit {
    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Default Grid',
            component: DemoGridDefaultComponent,
            description: 'thyTheme="default"',
            codeExamples: [
                {
                    type: 'html',
                    name: 'grid-default.component.html',
                    content: require('!!raw-loader!./default/grid-default.component.html')
                },
                {
                    type: 'ts',
                    name: 'grid-default.component.ts',
                    content: require('!!raw-loader!./default/grid-default.component.ts')
                }
            ]
        },
        {
            title: 'Bordered Grid',
            component: DemoGridBorderedComponent,
            description: 'thyTheme="bordered"',
            codeExamples: [
                {
                    type: 'html',
                    name: 'grid-bordered.component.html',
                    content: require('!!raw-loader!./bordered/grid-bordered.component.html')
                },
                {
                    type: 'ts',
                    name: 'grid-bordered.component.ts',
                    content: require('!!raw-loader!./bordered/grid-bordered.component.ts')
                }
            ]
        }
    ];

    gridApiParams = [
        {
            property: 'thyModel',
            description: 'Grid 数据源',
            type: 'Object[]',
            default: ''
        },
        {
            property: 'thyRowKey',
            description: '设置每行数据的唯一标识属性名',
            type: 'String',
            default: '_id'
        },
        {
            property: 'thyTheme',
            description: '设置Grid的显示风格 可选值 [default , bordered]',
            type: 'String',
            default: 'default'
        },
        {
            property: 'thySize',
            description: '设置Grid的行高，可选值为[default , sm], 设置sm时行高为44px',
            type: 'String',
            default: 'default'
        },
        {
            property: 'thyClassName',
            description: '设置Grid中使用的Table的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyLoadingDone',
            description: '设置加载状态',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'thyLoadingText',
            description: '设置加载显示的文本',
            type: 'String',
            default: ''
        },
        {
            property: 'thyEmptyOptions',
            description: '配置空状态组件',
            type: 'ThyGridEmptyOptions',
            default: ''
        },
        {
            property: 'thyFilter',
            description: '设置Grid过滤条件（暂未实现功能）',
            type: 'Object | Function',
            default: ''
        },
        {
            property: 'thyPageIndex',
            description: '设置当前页',
            type: 'Number',
            default: '1'
        },
        {
            property: 'thyPageSize',
            description: '设置每页显示数量',
            type: 'Number',
            default: '20'
        },
        {
            property: 'thyPageTotal',
            description: '设置总页数',
            type: 'Number',
            default: ''
        },
        {
            property: 'thyShowTotal',
            description: `是否显示左侧total`,
            type: 'Boolean | Template',
            default: 'false'
        },
        {
            property: 'thyDraggable',
            description: '开启Grid拖拽',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyHoverDisplayOperation',
            description: '开启Hover后显示操作',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyWholeRowSelect',
            description: '设置开启选中当前行自动选中checkbox',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thyShowHeader',
            description: '是否显示header',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: '(thyOnRowClick)',
            description: 'Grid行点击事件',
            type: 'ThyGridRowEvent',
            default: ''
        },
        {
            property: '(thyOnPageChange)',
            description: '翻页回调事件',
            type: 'PageChangedEvent',
            default: ''
        },
        {
            property: '(thyOnMultiSelectChange)',
            description: '多选回调事件',
            type: 'ThyMultiSelectEvent',
            default: ''
        },
        {
            property: '(thyOnRadioSelectChange)',
            description: '单选回调事件',
            type: 'ThyRadioSelectEvent',
            default: ''
        },
        {
            property: '(thyOnSwitchChange)',
            description: '切换组件回调事件',
            type: 'ThySwitchEvent',
            default: ''
        },
        {
            property: '(thyOnDraggableChange)',
            description: '拖动修改事件',
            type: 'ThyGridDraggableEvent',
            default: ''
        }
    ];

    columnApiParams = [
        {
            property: 'thyModelKey',
            description: '设置数据属性Key',
            type: 'String',
            default: ''
        },
        {
            property: 'thyTitle',
            description: '设置列名',
            type: 'String',
            default: ''
        },
        {
            property: 'thyWidth',
            description: '设置列的宽度',
            type: 'String | Number',
            default: ''
        },
        {
            property: 'thyClassName',
            description: '设置列的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyHeaderClassName',
            description: '是指列头部的Class',
            type: 'String',
            default: ''
        },
        {
            property: 'thyType',
            description: '设置列的类型 index:序列 ，checkbox:多选 ，radio:单选 ，switch:切换',
            type: 'String',
            default: ''
        },
        {
            property: 'thyDisabled',
            description: '设置自定义类型的禁用状态',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'thySelections',
            description:
                'checkbox radio 类型的列可设置选中的数据 ，支持 单个对象 单个Id  同时支持多个Id [_id1,_id2] 多个对象 [{_id:1},{_id:2}]',
            type: 'String | Number | Object | String[] | Number[] | Object[] ',
            default: ''
        },
        {
            property: 'thyDefaultText',
            description: '设置数据为空的时候显示的文本',
            type: 'String',
            default: ''
        }
    ];

    ngOnInit() {}
}

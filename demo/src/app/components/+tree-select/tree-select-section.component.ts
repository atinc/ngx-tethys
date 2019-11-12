import { Component } from '@angular/core';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoTreeSelectBasicComponent } from './basic/basic.component';
import { DemoTreeSelectSizeComponent } from './size/size.component';
import { DemoTreeSelectEmptyComponent } from './empty/empty.component';
import { DemoTreeSelectAsyncComponent } from './async/async.component';
import { DemoTreeSelectMultipleComponent } from './multiple/multiple.component';
import { DemoTreeSelectComplexComponent } from './complex/complex.component';

@Component({
    selector: 'demo-tree-select-section',
    templateUrl: './tree-select-section.component.html',
    styleUrls: ['./tree-select-section.scss']
})
export class DemoTreeSelectSectionComponent {
    public liveDemos: LiveDemoCodeExample[] = [
        {
            title: '基本使用',
            component: DemoTreeSelectBasicComponent,
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
            title: '复杂使用',
            component: DemoTreeSelectComplexComponent,
            description: `Tree Select 禁用、隐藏节点通过传入的 Function 判断`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'complex.component.html',
                    content: require('!!raw-loader!./complex/complex.component.html')
                },
                {
                    type: 'ts',
                    name: 'basic.component.ts',
                    content: require('!!raw-loader!./complex/complex.component.ts')
                }
            ]
        },
        {
            title: '多选',
            component: DemoTreeSelectMultipleComponent,
            description: `tree-select 多选`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'multiple.component.html',
                    content: require('!!raw-loader!./multiple/multiple.component.html')
                },
                {
                    type: 'ts',
                    name: 'multiple.component.ts',
                    content: require('!!raw-loader!./multiple/multiple.component.ts')
                }
            ]
        },
        {
            title: '大小',
            component: DemoTreeSelectSizeComponent,
            description: ``,
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
            title: '可选值为空',
            component: DemoTreeSelectEmptyComponent,
            description: `tree-select 的可选值为空`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'empty.component.html',
                    content: require('!!raw-loader!./empty/empty.component.html')
                },
                {
                    type: 'ts',
                    name: 'empty.component.ts',
                    content: require('!!raw-loader!./empty/empty.component.ts')
                }
            ]
        },
        {
            title: '异步获取可选值',
            component: DemoTreeSelectAsyncComponent,
            description: `tree-select 异步获取节点的子节点`,
            codeExamples: [
                {
                    type: 'html',
                    name: 'async.component.html',
                    content: require('!!raw-loader!./async/async.component.html')
                },
                {
                    type: 'ts',
                    name: 'async.component.ts',
                    content: require('!!raw-loader!./async/async.component.ts')
                }
            ]
        }
    ];

    public apiParameters = [
        {
            property: 'thyTreeNodes',
            description: 'treeNodes 数据',
            type: 'ThyTreeSelectNode[]',
            default: ''
        },
        {
            property: 'thyPrimaryKey',
            description: '树节点的唯一标识',
            type: 'string',
            default: '_id'
        },
        {
            property: 'thyShowKey',
            description: '树节点的显示的字段 key ',
            type: 'string',
            default: 'name'
        },
        {
            property: 'thyAllowClear',
            description: '单选时，是否显示清除按钮，当为 true 时，显示清除按',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyMultiple',
            description: '支持选多个节点',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyDisable',
            description: '是否禁用树选择器，当为 true 禁用树选择器',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyPlaceholder',
            description: '树选择框默认文字',
            type: 'string',
            default: '请选择节点'
        },
        {
            property: 'thySize',
            description: '大小，sm | md | lg | ""',
            type: 'string',
            default: ''
        },
        {
            property: 'thyEmptyOptionsText',
            description: '空的 options 提示',
            type: 'string',
            default: '暂时没有数据可选'
        },
        {
            property: 'thyHiddenNodeKey',
            description: '设置是否隐藏节点(不可进行任何操作),优先级高于 thyHiddenNodeFn',
            type: 'string',
            default: 'hidden'
        },
        {
            property: 'thyHiddenNodeFn',
            description: '设置是否隐藏节点(不可进行任何操作),优先级低于 thyHiddenNodeKey',
            type: 'Function',
            default: '(node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden'
        },
        {
            property: 'thyDisableNodeKey',
            description: '设置是否禁用节点(不可进行任何操作),优先级高于 thyDisableNodeFn',
            type: 'string',
            default: 'disabled'
        },
        {
            property: 'thyDisableNodeFn',
            description: '设置是否禁用节点(不可进行任何操作)，优先级低于 thyDisableNodeKey',
            type: 'Function',
            default: '(node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disable'
        },
        {
            property: 'thyAsyncNode',
            description: '是否异步加载节点的子节点(显示加载状态)，当为 true 时，异步获取',
            type: 'boolean',
            default: 'false'
        },
        {
            property: 'thyGetNodeChildren',
            description: '获取节点的子节点，返回 Observable<ThyTreeSelectNode>',
            type: 'Function',
            default: '(node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([])'
        }
    ];

    public classParameters = [
        {
            property: 'children',
            description: '子节点',
            type: 'ThyTreeSelectNode[]',
            default: ''
        },
        {
            property: 'childCount',
            description: '节点的子节点个数',
            type: 'number',
            default: ''
        },
        {
            property: '[key: string]',
            description: '自定义数据',
            type: 'any',
            default: ''
        }
    ];

    constructor() {}
}

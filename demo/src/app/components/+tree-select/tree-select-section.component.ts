import { Component } from '@angular/core';
import { tap, delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { treeSelectNodes } from './mock-data';
import { ThyTreeSelectNode } from '../../../../../src/tree-select/tree-select.class';

@Component({
    selector: 'demo-tree-select-section',
    templateUrl: './tree-select-section.component.html',
    styleUrls: ['./tree-select-section.scss']
})
export class DemoTreeSelectSectionComponent {
    nodes = treeSelectNodes;

    singleModel = {
        selectedValue: '010101',
        allowClear: false,
        disabled: false,
        showWholeName: true
    };

    objSelectedValue = treeSelectNodes[0];

    multiModel = ['010101'];

    asyncNodes = [
        {
            key: '01',
            title: 'root1',
            level: 0,
            children: [],
            childCount: 2
        }
    ];

    asyncValue = '';

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

    fetchNodeChildren(node: ThyTreeSelectNode) {
        return of([
            {
                key: '010101',
                title: 'child11',
                level: 2,
                icon: 'wtf wtf-file-text',
                children: []
            },
            {
                key: '010102',
                title: 'child12',
                level: 2,
                icon: 'wtf wtf-file-text',
                children: []
            }
        ]);
    }

    hiddenNodeFn(node: ThyTreeSelectNode) {
        return node.hidden;
    }

    disabledNodeFn(node: ThyTreeSelectNode) {
        return node.disable;
    }
}

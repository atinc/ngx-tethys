module.exports = [
    {
        type: 'component',
        name: 'thy-tree',
        description: '',
        properties: [
            {
                name: '[(ngModel)]',
                description: 'Tree展现所需的数据',
                type: 'ThyNodeData[]',
                default: ''
            },
            {
                name: 'thyNodes',
                description: 'Tree展现所需的数据',
                type: 'ThyNodeData[]',
                default: ''
            },
            {
                name: 'thyShowExpand',
                description: '设置TreeNode是否可展开',
                type: 'boolean | Function',
                default: ''
            },
            {
                name: 'thyCheckable',
                description: '设置Tree是否支持Checkbox选择',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyCheckStateResolve',
                description: '设置check状态的计算策略',
                type: 'Function',
                default: ''
            },
            {
                name: 'thyDraggable',
                description: '设置Tree是否可以进行拖拽排序',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyType',
                description: '设置不同展示类型的 Tree `default` 为小箭头展示， `especial` 为 加减号图标展示',
                type: 'string',
                default: 'default'
            },
            {
                name: 'thyIcons',
                description: '设置不同 Tree 展开折叠的图标，`expand` 为展开状态的图标，`collapse` 为折叠状态的图标',
                type: '{ expand: string, collapse: string }',
                default: '{}'
            },
            {
                name: 'thySize',
                description: '支持 `sm` | `default` 两种大小',
                type: 'string',
                default: ''
            },
            {
                name: 'thyAsync',
                description: '设置Tree是否需要支持异步加载',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyTitleTruncate',
                description: '设置节点名称是否需要超出截取',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyBeforeDragStart',
                description: '拖拽之前的回调，函数返回false则阻止拖拽',
                type: 'Function',
                default: ''
            },
            {
                name: 'thyBeforeDragDrop',
                description: '拖放到元素时回调，函数返回false则组织拖放到当前元素',
                type: ' Function',
                default: ''
            },

            {
                name: '(thyOnClick)',
                description: '设置子TreeNode点击事件',
                type: 'ThyTreeEmitEvent',
                default: ''
            },
            {
                name: '(thyOnCheckboxChange)',
                description: '设置check选择事件',
                type: 'ThyTreeEmitEvent',
                default: ''
            },
            {
                name: '(thyOnExpandChange)',
                description: '设置点击展开触发事件',
                type: 'ThyTreeEmitEvent',
                default: ''
            },
            {
                name: '(thyOnDragDrop)',
                description: '设置Tree拖拽事件',
                type: 'ThyTreeDragDropEvent',
                default: ''
            },
            {
                name: '#treeNodeTemplate',
                description: '设置TreeNode的渲染模板',
                type: 'TemplateRef',
                default: ''
            }
        ]
    }
];

module.exports = [
    {
        type: 'component',
        name: 'thy-tree-select',
        description: '树选择',
        properties: [
            {
                name: 'thyTreeNodes',
                description: 'treeNodes 数据。',
                type: 'ThyTreeSelectNode[]',
                default: ''
            },
            {
                name: 'thyPlaceholder',
                description: '树选择框默认文字。',
                type: 'string',
                default: '请选择节点'
            },
            {
                name: 'thyEmptyOptionsText',
                description: '改变空选项的情况下的提示文本',
                type: 'string',
                default: '暂时没有数据可选'
            },
            {
                name: 'thyPrimaryKey',
                description: '树节点的唯一标识。',
                type: 'string',
                default: '_id'
            },
            {
                name: 'thyShowKey',
                description: '树节点的显示的字段 key。',
                type: 'string',
                default: 'name'
            },
            {
                name: 'thyAllowClear',
                description: '单选时，是否显示清除按钮，当为 true 时，显示清除按钮。',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisable',
                description: '是否禁用树选择器，当为 true 禁用树选择器。',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thySize',
                description: '控制树选择的输入框大小，"xs | sm | md | default | lg"。',
                type: 'string',
                default: ''
            },
            {
                name: 'thyHiddenNodeKey',
                description: '设置是否隐藏节点(不可进行任何操作)，优先级高于 thyHiddenNodeFn。',
                type: 'string',
                default: 'hidden'
            },
            {
                name: 'thyHiddenNodeFn',
                description: '设置是否隐藏节点(不可进行任何操作),优先级低于 thyHiddenNodeKey。',
                type: 'Function',
                default: '(node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.hidden'
            },
            {
                name: 'thyDisableNodeKey',
                description: '设置是否禁用节点(不可进行任何操作),优先级高于 thyDisableNodeFn。',
                type: 'string',
                default: 'disabled'
            },
            {
                name: 'thyDisableNodeFn',
                description: '设置是否禁用节点(不可进行任何操作)，优先级低于 thyDisableNodeKey。',
                type: 'Function',
                default: '(node: ThyTreeSelectNode) => boolean = (node: ThyTreeSelectNode) => node.disabled'
            },
            {
                name: 'thyAsyncNode',
                description: '是否异步加载节点的子节点(显示加载状态)，当为 true 时，异步获取。',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyGetNodeChildren',
                description: '获取节点的子节点，返回 Observable<ThyTreeSelectNode>。',
                type: 'Function',
                default: '(node: ThyTreeSelectNode) => Observable<ThyTreeSelectNode> = (node: ThyTreeSelectNode) => of([])'
            }
        ]
    }
];

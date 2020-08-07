module.exports = [
    {
        type: 'component',
        name: 'thy-list',
        description: 'List 列表',
        properties: [
            {
                name: 'thyDivided',
                description: '控制分割线的显示与隐藏',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-selection-list',
        description: 'Grid 列表展示模式',
        properties: [
            {
                name: 'thySize',
                description: '改变 grid item 的大小。支持默认以及"sm"两种大小。',
                type: 'string',
                default: ''
            },
            {
                name: 'thyMultiple',
                description: '改变 grid item 的选择模式，使其支持多选。',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyLayout',
                description: '改变 grid item 的展示样式，是 “list” 形式还是 “grid” 形式。',
                type: 'string',
                default: 'list'
            },
            {
                name: 'thyUniqueKey',
                description: 'Option Value 唯一的 Key，用于存储哪些选择被选中的唯一值，只有 Option 的 thyValue 是对象的时才可以传入该选项',
                type: 'string',
                default: ''
            },
            {
                name: 'thySelectionChange',
                description: '选择 Options 的 Change 事件。',
                type: 'Function',
                default: ''
            },
            {
                name: 'ngModel',
                description: '默认选择项，选择项可以是对象，也可以是唯一的 ID，一般和 Option 的 thyValue 对应。',
                type: 'any',
                default: ''
            },
            {
                name: 'thyCompareWith',
                description: '比较2个选项的 Value 是否相同。',
                type: 'Function',
                default: ''
            },
            {
                name: 'thyBeforeKeydown',
                description: '键盘事件触发 Before 调用，如果返回 false 则停止继续执行。',
                type: 'Function',
                default: ''
            },
            {
                name: 'thyScrollContainer',
                description: '出现滚动条的容器。',
                type: 'Element | ElementRef | string',
                default: 'thy-selection-list 组件绑定的元素。'
            },
            {
                name: 'thyBindKeyEventContainer',
                description: '绑定键盘事件的容器。',
                type: 'Element | ElementRef | string',
                default: 'thy-selection-list 组件绑定的元素。'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-list-option',
        description: 'Grid 列表展示模式的子项',
        properties: [
            {
                name: 'thyValue',
                description: '选项的 Value，可以是普通的 ID，也可以是对象，与 thy-selection-list 的 ngModel 和 thyUniqueKey 配合使用',
                type: 'any',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '禁用选项',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-list-item-meta',
        description: '预设列表样式',
        properties: [
            {
                name: 'thyAvatar',
                description: '列表项的左侧图片',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTitle',
                description: '列表项的标题',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDescription',
                description: '列表项的描述文本',
                type: 'string',
                default: ''
            }
        ]
    }
];

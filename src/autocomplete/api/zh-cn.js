module.exports = [
    {
        type: 'Dom',
        name: 'input',
        description: '自动完成',
        properties: [
            {
                name: 'thyAutofocus',
                description: '自动获取焦点',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyPlaceholder',
                description: '输入框提示',
                type: 'string',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyAutocompleteTrigger',
        properties: [
            {
                name: 'thyAutocompleteComponent',
                description: '下拉菜单组件实例',
                type: 'ThyAutocompleteComponent',
                default: ''
            },
            {
                name: 'thyOffset',
                description: '弹出框默认 offset',
                type: 'number',
                default: 4
            },
            {
                name: 'thyAutocompleteWidth',
                description: '下拉菜单的宽度，不设置默认与输入框同宽',
                type: 'number',
                default: ''
            },
            {
                name: 'thyPlacement',
                description: `下拉菜单的显示位置，'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'leftTop' | 'leftBottom' | 'right' | 'rightTop' | 'rightBottom'`,
                type: 'string',
                default: 'bottomLeft'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-autocomplete',
        properties: [
            {
                name: 'thyEmptyText',
                description: '空选项时的文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyAutoActiveFirstOption',
                description: '是否默认高亮第一个选项',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyOptionSelected',
                description: '被选中时调用，参数包含选中项的 value 值',
                type: 'EventEmitter<ThyOptionSelectionChangeEvent>',
                default: ''
            },
            {
                name: 'thyOpened',
                description: '只读，展开下拉菜单的回调',
                type: 'EventEmitter<void>',
                default: ''
            },
            {
                name: 'thyClosed',
                description: '只读，关闭下拉菜单的回调',
                type: 'EventEmitter<void>',
                default: ''
            },
            {
                name: 'thyOptionActivated',
                description: '只读，选中 option 变化时，调用此函数',
                type: 'EventEmitter<ThyAutocompleteActivatedEvent>',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-option',
        properties: [
            {
                name: 'thyValue',
                description: '每个option的value值',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLabelText',
                description: '每个option的label，用于显示',
                type: 'string',
                default: ''
            },
            {
                name: 'thyShowOptionCustom',
                description: '是否自定义展示option内容',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];

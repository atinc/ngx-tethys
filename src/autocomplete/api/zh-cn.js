module.exports = [
    {
        type: 'Dom',
        name: 'input',
        description: '自动完成',
        properties: [
            {
                name: 'thyAutofocus',
                description: '是否自动聚焦',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'placeholder',
                description: '默认显示字',
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
                name: 'thyAutocomplete',
                description: '传入trigger触发的autocomplete组件实例',
                type: 'ThyAutocompleteComponent',
                default: ''
            },
            {
                name: 'thyOffset',
                description: 'overlay的offset',
                type: 'number',
                default: 8
            },
            {
                name: 'thyAutocompleteWidth',
                description: 'autocomplete组件的宽度，不设置宽度则与trigger保持一致',
                type: 'number',
                default: ''
            },
            {
                name: 'thyPlacement',
                description: 'autocomplete显示位置',
                type: 'number',
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
                description: '自动激活第一个选项',
                type: 'EventEmitter<ThyAutocompleteActivatedEvent>',
                default: 'false'
            },
            {
                name: 'thyOptionSelected',
                description: 'output event: option选择事件',
                type: 'EventEmitter<ThyOptionSelectionChangeEvent>',
                default: ''
            },
            {
                name: 'thyOpened',
                description: 'output event: 打开事件',
                type: 'EventEmitter<void>',
                default: ''
            },
            {
                name: 'thyClosed',
                description: 'output event: 关闭事件',
                type: 'EventEmitter<void>',
                default: ''
            },
            {
                name: 'thyOptionActivated',
                description: 'option activated event: 激活状态改变触发(Arrow Up/Down select)',
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

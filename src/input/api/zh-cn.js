module.exports = [
    {
        type: 'directive',
        name: 'thyInput',
        description: '输入框',
        properties: [
            {
                name: 'thySize',
                description: '大小',
                type: `'xs' | 'sm' | 'md' | 'lg'`,
                default: ''
            },
            {
                name: 'thyAutocomplete',
                description: '自动表单',
                type: 'Boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-input',
        description: '输入框',
        properties: [
            {
                name: 'placeholder',
                description: '提示文字',
                type: 'String',
                default: ''
            },
            {
                name: 'thySize',
                description: '大小',
                type: `'xs' | 'sm' | 'md' | 'lg'`,
                default: ''
            },
            {
                name: 'thyAutofocus',
                description: '自动焦点',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'type',
                description: 'input的类型',
                type: 'String',
                default: 'text'
            },
            {
                name: 'thyType',
                description: 'input的类型',
                type: 'String',
                default: 'text'
            },
            {
                name: 'thyLabelText',
                description: 'label的文字',
                type: 'String',
                default: ''
            },
            {
                name: 'readonly',
                description: 'input只读',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyAutocomplete',
                description: '自动表单',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'focus EventEmitter',
                description: '焦点激活事件',
                type: 'Event',
                default: ''
            },
            {
                name: 'blur EventEmitter',
                description: '失去焦点事件',
                type: 'Event',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-input-search',
        description: '搜索框',
        properties: [
            {
                name: 'name',
                description: 'property name of NgModel',
                type: 'String',
                default: ''
            },
            {
                name: 'placeholder',
                description: '提示文字',
                type: 'String',
                default: ''
            },
            {
                name: 'thyTheme',
                description: '主题',
                type: '' | 'ellipse',
                default: ''
            },
            {
                name: 'thySearchFocus',
                description: '自动焦点',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'clear EventEmitter',
                description: '点击清空事件',
                type: 'Event',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-input-group',
        description: '输入框组',
        properties: [
            {
                name: 'thyAppendText',
                description: '追加文字',
                type: 'String',
                default: ''
            },
            {
                name: 'thyAppendTextTranslateKey',
                description: '追加文本多语言 Key',
                type: 'String',
                default: ''
            },
            {
                name: 'thyPrependText',
                description: '前置文本',
                type: 'String',
                default: ''
            },
            {
                name: 'thyPrependTextTranslateKey',
                description: '前置文本多语言 key',
                type: 'String',
                default: ''
            },
            {
                name: 'append',
                description: '追加的自定义 Template',
                type: 'NgTemplate',
                default: ''
            },
            {
                name: 'prepend',
                description: '前置的自定义 Template',
                type: 'NgTemplate',
                default: ''
            },
            {
                name: 'thySize',
                description: '大小',
                type: `'' | 'md' | 'lg'`,
                default: ''
            },
            {
                name: 'readonly',
                description: 'input只读',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thySearchFocus',
                description: '自动焦点',
                type: 'Boolean',
                default: 'false'
            }
        ]
    }
];

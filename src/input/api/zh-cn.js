module.exports = [
    {
        type: 'directive',
        name: 'thyInput',
        description: '输入框',
        properties: [
            {
                name: 'thySize',
                description: `输入框大小，目前可传的大小有'xs' | 'sm' | 'md' | 'default' | 'lg'`,
                type: `string`,
                default: 'default'
            },
            {
                name: 'thyAutocomplete',
                description: '输入字段是否应该启用自动完成功能',
                type: 'boolean',
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
                description: '输入框的 Placeholder',
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: `输入框大小，目前可传的大小有'xs' | 'sm' | 'md' | 'default' | 'lg'`,
                type: `string`,
                default: 'default'
            },
            {
                name: 'thyAutofocus',
                description: '是否自动聚焦',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'type',
                description: '输入框的类型，与 input 的类型一致，已经废弃，请使用 thyType',
                type: 'string',
                default: 'text'
            },
            {
                name: 'thyType',
                description: `输入框的类型，与 input 的类型一致，当类型为'password'时，输入框支持密码可见`,
                type: 'string',
                default: 'text'
            },
            {
                name: 'thyLabelText',
                description: '输入框的label提示文字',
                type: 'string',
                default: ''
            },
            {
                name: 'readonly',
                description: 'input只读',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyAutocomplete',
                description: '输入字段是否应该启用自动完成功能',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'focus',
                description: '焦点激活事件',
                type: 'EventEmitter<Event>',
                default: ''
            },
            {
                name: 'blur',
                description: '焦点失去事件',
                type: 'EventEmitter<Event>',
                default: ''
            },
            {
                name: 'append',
                description: '自定义后置元素',
                type: 'ContentChild<TemplateRef>',
                default: ''
            },
            {
                name: 'prepend',
                description: '自定义前置元素',
                type: 'ContentChild<TemplateRef>',
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
                description: 'input元素名称',
                type: 'string',
                default: ''
            },
            {
                name: 'placeholder',
                description: '搜索框placeholder',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIconPosition',
                description: `搜索图标位置，当传入 after 时，搜索图标在输入框后方显示，有内容时显示为关闭按钮`,
                type: `'before' | 'after'`,
                default: 'before'
            },
            {
                name: 'thyTheme',
                description: `搜索框风格，分为'default'和'ellipse'两种`,
                type: 'string',
                default: 'default'
            },
            {
                name: 'thySearchFocus',
                description: '是否自动聚焦',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'clear',
                description: '清除搜索事件',
                type: 'EventEmitter<Event>',
                default: ''
            },
            {
                name: 'thySize',
                description: `搜索框大小，目前可传的大小有'xs' | 'sm' | 'md' | 'default' | 'lg'`,
                type: 'string',
                default: 'default'
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
                description: '输入框上添加的后置文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyAppendTextTranslateKey',
                description: '输入框上添加的后置文本的多语言 Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyPrependText',
                description: '输入框上添加的前置文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyPrependTextTranslateKey',
                description: '输入框上添加的前置文本的多语言 key',
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: `输入框大小，目前可传的大小有'xs' | 'sm' | 'md' | 'default' | 'lg'`,
                type: 'string',
                default: 'default'
            },
            {
                name: 'prefix',
                description: '自定义前置元素，展示在输入框内',
                type: 'ContentChild<TemplateRef>',
                default: ''
            },
            {
                name: 'suffix',
                description: '自定义后置元素，展示在输入框内',
                type: 'ContentChild<TemplateRef>',
                default: ''
            },
            {
                name: 'append',
                description: '自定义后置元素，独立于输入框之后',
                type: 'ContentChild<TemplateRef>',
                default: ''
            },
            {
                name: 'prepend',
                description: '自定义前置元素，独立于输入框之前',
                type: 'ContentChild<TemplateRef>',
                default: ''
            }
        ]
    }
];

module.exports = [
    {
        type: 'directive',
        name: 'thyForm',
        properties: [
            {
                name: 'thyLayout',
                description: `布局, 'horizontal' | 'vertical' | 'inline' , 默认水平居中 horizontal， 其他2种布局待开发`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyEnterKeyMode',
                description: `Enter 键提交模式， submit | alwaysSubmit | forbidSubmit， 默认 submit,
                submit: Textare 需要 Ctrl | Command + Enter 提交，其他元素直接 Enter 提交； alwaysSubmit: 不管是什么元素 Enter 都提交； forbidSubmit: Enter 不提交`,
                type: 'string',
                default: 'submit'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyFormSubmit',
        properties: [
            {
                name: 'thyFormSubmit',
                description: 'Form 验证通过的提交函数',
                type: 'Function',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-form-group',
        properties: [
            {
                name: 'thyLabelText',
                description: 'Label 文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLabelTextTranslateKey',
                description: 'Label 文本多语言 Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLabelRequired',
                description: 'Label 是否显示必填项样式',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyFeedbackIcon',
                description: '反馈图标，比如日期输入框显示日期的图标，常用输入 date 表示时间 wtf wtf-schedule-o',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTips',
                description: '提示文案',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTipsTranslateKey',
                description: '提示文案的多语言 Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyRowFill',
                description: '是否填充整行, 没有 Label 文本，只有输入框',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'formGroup',
                description: '自定义内容的 Template',
                type: 'TemplateRef',
                default: 'null'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-form-group-footer',
        properties: [
            {
                name: 'thyAlign',
                description: `对齐方式， 'left' | 'right' | 'center'`,
                type: 'string',
                default: 'left'
            }
        ]
    }
];

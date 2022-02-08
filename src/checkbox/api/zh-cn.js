module.exports = [
    {
        type: 'directive',
        name: 'thyCheckbox',
        description: '多选框',
        properties: [
            {
                name: 'thyLabelText',
                description: '选择框 Label 展示文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyInline',
                description: '同一行展示',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyLabelTextTranslateKey',
                description: 'Label 文本多语言 key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'ngModel',
                description: '表单双向绑定的值',
                type: '',
                default: ''
            },
            {
                name: 'disabled',
                description: '是否禁用，当和 ngModel 配置使用才会有效，如果单独设置禁用使用  thyDisabled',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyIndeterminate',
                description: '设置 indeterminate 状态，只负责样式控制 Set the indeterminate state, responsible only for style control',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];

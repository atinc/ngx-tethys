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
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyLabelTextTranslateKey',
                description: 'Checkbox Label 文本 多语言 key',
                type: 'String',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '禁用',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'ngModel',
                description: '表单双向绑定的值',
                type: 'Boolean',
                default: ''
            },
            {
                name: 'disabled',
                description: '是否禁用，当和 ngModel 配置使用才会有效，如果单独设置禁用使用  thyDisabled',
                type: 'Boolean',
                default: ''
            },
            {
                name: 'thyIndeterminate',
                description: '设置 indeterminate 状态，只负责样式控制 Set the indeterminate state, responsible only for style control',
                type: 'Boolean',
                default: 'false'
            }
        ]
    }
];

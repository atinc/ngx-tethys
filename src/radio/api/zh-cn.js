module.exports = [
    {
        type: 'directive',
        name: 'thyRadio',
        description: '单选框',
        properties: [
            {
                name: 'thyLabelText',
                description: '选择框 Label 展示文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '禁用单选框',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'disabled',
                description: '是否禁用单选框，当和 ngModel 配置使用才会有效，如果单独设置禁用使用 thyDisabled',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyInline',
                description: '切换 Label 的排列状态是行级还是块级分布',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyLabelTextTranslateKey',
                description: 'Label 文本多语言 Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyValue',
                description: '当和 thy-radio-group 配合使用时的值，选中后的 NgModel 值',
                type: 'any',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-radio-group',
        description: '单选框组',
        properties: [
            {
                name: 'ngModel',
                description: '双向绑定值，指定选中的 Radio 的 thyValue 的值',
                type: 'any',
                default: ''
            },
            {
                name: 'ngModelChange',
                description: '值发生改变时触发回调函数',
                type: 'function',
                default: ''
            }
        ]
    }
];

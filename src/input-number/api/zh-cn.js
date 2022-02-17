module.exports = [
    {
        type: 'component',
        name: 'thy-input-number',
        description: '数字输入框',
        properties: [
            {
                name: 'thyPlaceholder',
                description: '输入框的placeholder',
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: `输入框大小，目前可传的大小有'xs' | 'sm' | 'md' | 'lg'`,
                type: `'xs' | 'sm' | 'md' | 'lg' | ''`,
                default: ''
            },
            {
                name: 'thyAutofocus',
                description: '是否自动聚焦',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyMax',
                description: `最大值`,
                type: 'number',
                default: 'Infinity'
            },
            {
                name: 'thyMin',
                description: '最小值',
                type: 'number',
                default: '-Infinity'
            },
            {
                name: 'thyStep',
                description: '每次改变步数，可以为小数',
                type: 'number',
                default: '1'
            },
            {
                name: 'thyPrecision',
                description: '数值精度',
                type: 'number',
                default: ''
            },
            {
                name: 'thySuffix',
                description: '数值后缀',
                type: 'string',
                default: ''
            },

            {
                name: 'thyFocus',
                description: '焦点激活事件',
                type: 'EventEmitter<Event>',
                default: ''
            },
            {
                name: 'thyBlur',
                description: '焦点失去事件',
                type: 'EventEmitter<Event>',
                default: ''
            }
        ]
    }
];

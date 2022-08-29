module.exports = [
    {
        type: 'directive',
        name: 'thyCopy',
        description: '默认为点击标签，可传复制目标标签',
        properties: [
            {
                name: 'thyCopySuccessText',
                description: '复制成功时的文案',
                type: 'string',
                default: '复制成功'
            },
            {
                name: 'thyCopyTips',
                description: '提示文案',
                type: 'string',
                default: '点击复制'
            },
            {
                name: 'thyCopyTipsOffset',
                description: '偏移量',
                type: 'number',
                default: '4'
            },
            {
                name: 'thyCopyContent',
                description: '复制的内容',
                type: 'any',
                default: ''
            },
            {
                name: 'thyShowNotify',
                description: '是否展示通知',
                type: 'boolean',
                default: 'true'
            }
        ]
    }
];

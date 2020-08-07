module.exports = [
    {
        type: 'component',
        name: 'thy-loading',
        description: '页面调用接口等待请求时，给用户的反馈',
        properties: [
            {
                name: 'thyDone',
                description: '是否加载完成',
                type: `boolean`,
                default: 'false'
            },
            {
                name: 'thyTip',
                description: '自定义文案',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIsMask',
                description: '嵌套遮罩模式',
                type: 'boolean',
                default: ''
            }
        ]
    }
];

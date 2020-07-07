module.exports = [
    {
        type: 'component',
        name: 'thy-back-top',
        description: '有默认样式，距离底部 50px，可覆盖。 自定义样式宽高不大于 40px * 40px。',
        properties: [
            {
                name: 'thyTemplate',
                description: `自定义内容，见示例`,
                type: 'TemplateRef<void>',
                default: 'primary'
            },
            {
                name: 'thyVisibilityHeight',
                description: `滚动高度达到此参数值才出现 thy-back-top`,
                type: 'number',
                default: '400'
            },
            {
                name: 'thyTarget',
                description: `设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数`,
                type: 'string | Element',
                default: 'window'
            },
            {
                name: 'thyClick',
                description: `点击按钮的回调函数`,
                type: 'EventEmitter<boolean>',
                default: 'window'
            }
        ]
    }
];

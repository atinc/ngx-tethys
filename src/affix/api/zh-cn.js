module.exports = [
    {
        type: 'component',
        name: 'thy-affix',
        description: '固钉组件',
        properties: [
            {
                name: 'thyContainer',
                description: `设置 thy-affix 需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数`,
                type: 'string | HTMLElement',
                default: 'window'
            },
            {
                name: 'thyChange',
                description: `固定状态改变时触发的回调函数`,
                type: 'EventEmitter<boolean>',
                default: '-'
            },
            {
                name: 'thyOffsetTop',
                description: `距离窗口顶部缓冲的偏移量阈值`,
                type: 'number',
                default: '0'
            },
            {
                name: 'thyOffsetBottom',
                description: `距离窗口底部缓冲的偏移量阈值`,
                type: 'number',
                default: '-'
            }
        ]
    }
];

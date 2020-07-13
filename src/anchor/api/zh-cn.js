module.exports = [
    {
        type: 'component',
        name: 'thy-anchor',
        description: '锚点组件',
        properties: [
            {
                name: 'thyAffix',
                description: `固定模式`,
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyBounds',
                description: `锚点区域边界，单位：px`,
                type: 'number',
                default: '5'
            },
            {
                name: 'thyOffsetTop',
                description: `缓冲的偏移量阈值`,
                type: 'number',
                default: '-'
            },
            {
                name: 'thyContainer',
                description: `指定滚动的容器`,
                type: 'string | HTMLElement',
                default: 'default'
            },
            {
                name: 'thyClick',
                description: `点击项触发`,
                type: 'EventEmitter<ThyAnchorLinkComponent>',
                default: 'window'
            },
            {
                name: 'thyScroll',
                description: `滚动到某锚点时触发`,
                type: 'EventEmitter<ThyAnchorComponent>',
                default: '-'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-link',
        description: '锚点链接',
        properties: [
            {
                name: 'thyHref',
                description: `锚点链接`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thyTitle',
                description: `文字内容`,
                type: 'string | Template<void>',
                default: '-'
            }
        ]
    }
];

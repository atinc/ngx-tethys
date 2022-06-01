module.exports = [
    {
        type: 'component',
        name: 'thy-card',
        properties: [
            {
                name: 'thyDivided',
                type: 'boolean',
                default: 'false',
                description: '是否是分割模式，分割模式头部和内容区之间有一条分割线'
            },
            {
                name: 'thySize',
                type: 'string',
                default: 'md',
                description: `大小，可选值为：sm、md、lg`
            },
            {
                name: 'thyHasLeftRightPadding',
                type: 'boolean',
                default: 'true',
                description: `左右是否有内边距，已废弃，如需配置间距使用 spacing 工具样式覆盖默认间距`
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-card-header',
        properties: [
            {
                name: 'thyTile',
                type: 'string',
                default: '-',
                description: `头部，标题`
            },
            {
                name: 'thyDescription',
                type: 'string',
                default: '-',
                description: `头部，附加信息`
            },
            {
                name: 'thySize',
                type: 'lg | md | sm',
                default: 'md',
                description: `已废弃，头部大小`
            },
            {
                name: 'headerTitle',
                type: 'ContentChild<TemplateRef>',
                default: '',
                description: `自定义头部标题`
            },
            {
                name: 'headerDescription',
                type: 'ContentChild<TemplateRef>',
                default: '',
                description: `自定义头部描述`
            },
            {
                name: 'headerOperation',
                type: 'ContentChild<TemplateRef>',
                default: '',
                description: `自定义头部操作区域`
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-card-content',
        properties: [
            {
                name: 'thyScroll',
                type: 'boolean',
                default: 'false',
                description: `内容区，滚动`
            },
            {
                name: 'thySize',
                type: ' md | sm',
                default: 'md',
                description: `已废弃，Content 大小, sm 时 padding-top 间距变小`
            }
        ]
    }
];

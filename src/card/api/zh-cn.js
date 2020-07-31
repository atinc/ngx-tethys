module.exports = [
    {
        type: 'component',
        name: 'thy-card',
        properties: [
            {
                name: 'thyHasLeftRightPadding',
                type: 'boolean',
                default: 'true',
                description: `左右是否有内边距`
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
                type: 'lg | sm',
                default: '-',
                description: `头部大小`
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
                name: 'thyAlign',
                type: 'string: title',
                default: '-',
                description: `内容区，对齐头部文字`
            },

            {
                name: 'thySize',
                type: 'sm',
                default: '-',
                description: `Content大小`
            }
        ]
    }
];

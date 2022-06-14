module.exports = [
    {
        type: 'component',
        name: 'thyDot',
        description: '显示一个点的组件',
        properties: [
            {
                name: 'thyColor',
                description: '点颜色 支持设置主题色和颜色值，主题色为 default、primary、success、info、warning、danger、light',
                type: 'string',
                default: 'primary'
            },
            {
                name: 'thySize',
                description: `点大小，目前可传的大小为： \`xs \` |  \`sm \` |  \`md \` |  \`lg \``,
                type: 'string',
                default: 'sm'
            },
            {
                name: 'thyTheme',
                description: `点主题 fill 为颜色填充，outline 为线框`,
                type: `'outline' | 'fill'`,
                default: 'fill'
            },
            {
                name: 'thyShape',
                description: `点的形状 square为方形，circle为圆形`,
                type: `'square'|'circle'`,
                default: 'circle'
            }
        ]
    }
];

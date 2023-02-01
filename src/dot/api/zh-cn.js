module.exports = [
    {
        type: 'component',
        name: 'thyDot',
        description: '显示一个点的组件',
        properties: [
            {
                name: 'thyColor',
                description:
                    '颜色，可选值为：`primary` `success` `info` `warning` `danger` `default` `light`和自定义颜色，如`#2cccda` `red`  `rgb(153, 153, 153)`',
                type: 'string',
                default: 'primary'
            },
            {
                name: 'thySize',
                description: '大小，可选值为： `xs `   `sm `   `md `  `lg `  `xlg `',
                type: 'string',
                default: 'sm'
            },
            {
                name: 'thyTheme',
                description: '主题，可选值为： 填充`fill`  线框`outline`',
                type: `'outline' | 'fill'`,
                default: 'fill'
            },
            {
                name: 'thyShape',
                description: '形状，可选值为： 圆形`circle`，方形`square`',
                type: `'square'|'circle'`,
                default: 'circle'
            }
        ]
    }
];

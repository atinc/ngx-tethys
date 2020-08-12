module.exports = [
    {
        type: 'component',
        name: 'thy-badge',
        description: '徽标',
        properties: [
            {
                name: 'thyType',
                description: `badge类型, 类型为 'primary' | 'danger' | 'warning' | 'secondary'`,
                type: 'string',
                default: 'danger'
            },
            {
                name: 'thyCount',
                description: '徽标内容为数字时',
                type: 'number',
                default: ''
            },
            {
                name: 'thyContext',
                description: '徽标内容是字符串时',
                type: 'string',
                default: 'false'
            },
            {
                name: 'thyMaxCount',
                description: '徽标显示的最大值, 与thyCount一起使用,thyCount超过了thyMaxCount设置的值时,徽标内容为thyMaxCount+',
                type: 'number',
                default: ''
            },
            {
                name: 'thySize',
                description: '徽标显示的大小',
                type: `lg | sm`,
                default: `font-size: 0.75rem, padding: 2px 0.3rem`
            },
            {
                name: 'thyIsDot',
                description: '徽标是个状态点且实心时',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyIsHollow',
                description: '徽标是个状态点且空心时',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyKeepShow',
                description: 'thyCount为0时,强制显示',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyTextColor',
                description: '自定义设置徽标字体的颜色',
                type: 'string',
                default: ''
            },
            {
                name: 'thyBackgroundColor',
                description: '自定义设置徽标的背景颜色',
                type: 'string',
                default: ''
            }
        ]
    }
];

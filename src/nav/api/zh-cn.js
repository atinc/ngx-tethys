module.exports = [
    {
        type: 'component',
        name: 'thy-nav',
        properties: [
            {
                name: 'thyType',
                description: `类型，'primary' | 'secondary' | 'thirdly' | 'secondary-divider'`,
                type: 'string',
                default: 'false'
            },
            {
                name: 'thySize',
                description: '导航大小，sm、md',
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyHorizontal',
                description: `水平对齐方式，'' | 'left' | 'center' | 'right'`,
                type: 'string',
                default: 'true'
            },
            {
                name: 'thyVertical',
                description: `是否为上下垂直布局`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyFill',
                description: '是否填充整行',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyNavLink',
        properties: [
            {
                name: 'thyNavLinkActive',
                description: '是否激活',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-icon-nav',
        properties: [
            {
                name: 'thyType',
                type: 'string',
                default: 'primary',
                description: `图标导航类型，'primary' | 'secondary' | 'individual' | ''`
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyIconNavLink',
        properties: [
            {
                name: 'thyIconNavLinkIcon',
                description: '是否 Active 状态',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyIconNavLinkIcon',
                description: 'Icon 图标的名字, 如果传入了名字可以不用单独设置 <thy-icon thyIconName="xxx"></thy-icon>',
                type: 'string',
                default: ''
            }
        ]
    }
];

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
                description: `垂直布局`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyFill',
                description: '是否填充正航',
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
                description: 'primary | secondary | thirdly | secondary-divider',
                type: 'string',
                default: ''
            },
            {
                name: 'thyHorizontal',
                description: '',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyVertical',
                description: '',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyFill',
                description: '',
                type: 'boolean',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-icon-nav',
        properties: [
            {
                name: 'thyIconNavLinkActive',
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

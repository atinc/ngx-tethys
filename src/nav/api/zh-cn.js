module.exports = [
    {
        type: 'component',
        name: 'thy-nav',
        properties: [
            {
                name: 'thyType',
                description: `类型，'primary' | 'secondary' | 'thirdly' | 'secondary-divider'`,
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: `导航大小，'sm'|' '，' '为md大小`,
                type: 'string',
                default: `' '`
            },
            {
                name: 'thyHorizontal',
                description: `水平对齐方式，'left' | 'center' | 'right'`,
                type: 'string',
                default: 'left'
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
            },
            {
                name: 'thyResponsive',
                description: '是否是响应式布局',
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
                description: '是否是激活状态',
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
                description: `图标导航类型，'primary' | 'secondary' | 'individual' `
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyIconNavLink',
        properties: [
            {
                name: 'thyIconNavLinkActive',
                description: '是否是激活状态',
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

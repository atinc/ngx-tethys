export const apiIconNavParameters = [
    {
        property: 'thyType',
        description: 'primary | secondary | thirdly | secondary-divider',
        type: 'string',
        default: ''
    },
    {
        property: 'thyHorizontal',
        description: '',
        type: 'boolean',
        default: ''
    },
    {
        property: 'thyVertical',
        description: '',
        type: 'boolean',
        default: ''
    },
    {
        property: 'thyFill',
        description: '',
        type: 'boolean',
        default: ''
    }
];

export const apiIconNavLinkParameters = [
    {
        property: 'thyIconNavLinkActive',
        description: '是否 Active 状态',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyIconNavLinkIcon',
        description: 'Icon 图标的名字, 如果传入了名字可以不用单独设置 <thy-icon thyIconName="xxx"></thy-icon>',
        type: 'string',
        default: ''
    }
];

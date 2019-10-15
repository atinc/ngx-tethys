export const apiCardParameters = [
    {
        property: 'thyHasLeftRightPadding',
        description: '左右是否有内边距',
        type: 'boolean',
        default: 'true'
    }
];

export const apiHeaderParameters = [
    {
        property: 'thyTitle',
        description: '头部，标题',
        type: 'string',
        default: ''
    },
    {
        property: 'thyDescription',
        description: '头部，附加信息',
        type: 'string',
        default: ''
    },
    {
        property: 'thySize',
        description: '头部大小',
        type: 'lg | sm',
        default: ''
    }
];

export const apiContentParameters = [
    {
        property: 'thyScroll',
        description: '内容区，滚动',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyAlign',
        description: '内容区，对齐头部文字',
        type: 'string: title',
        default: ''
    },
    {
        property: 'thySize',
        description: 'Content大小',
        type: 'sm',
        default: ''
    }
];

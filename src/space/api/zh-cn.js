module.exports = [
    {
        type: 'component',
        name: 'thy-space',
        description: '间距组件',
        properties: [
            {
                name: 'thySize',
                type: `'sm' | 'md' | 'lg' | number`,
                description: `大小，支持 'sm' | 'md' | 'lg' 和自定义数字大小`,
                default: 'md'
            },
            {
                name: 'thyVertical',
                type: 'boolean',
                description: '间距垂直方向',
                default: 'false'
            },
            {
                name: 'thyAlign',
                type: `'start' | 'end' | 'baseline' | 'center'`,
                description: '对齐方式',
                default: 'false'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thySpaceItem',
        description: '间距组件项，使用结构性指令 *thySpaceItem 传入模板'
    }
];

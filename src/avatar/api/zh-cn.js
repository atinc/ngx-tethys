module.exports = [
    {
        type: 'component',
        name: 'thy-avatar',
        description: '头像组件',
        properties: [
            {
                name: 'thySrc',
                description:
                    '头像路径地址, 默认为全路径，如果不是全路径，可以通过自定义服务 ThyAvatarService，重写 avatarSrcTransform 方法实现转换',
                type: 'string',
                default: ''
            },
            {
                name: 'thyName',
                description: '人员名称（可设置自定义名称，需通过自定义服务 ThyAvatarService，重写 nameTransform 方法去实现转换）',
                type: 'string',
                default: ''
            },
            {
                name: 'thyShowName',
                description: '是否展示人员名称',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyShowRemove',
                description: '是否展示移除按钮',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyOnRemove',
                description: '移除按钮的事件, 当 thyShowRemove 为 true 时起作用',
                type: 'Event',
                default: ''
            },
            {
                name: 'thySize',
                description: '头像大小，可选择 22, 24, 28, 32, 36, 48, 68, 110, 160 | xxs(22px), xs(24px), sm(32px), md(36px), lg(48px)',
                type: 'number | string',
                default: 'md'
            },
            {
                name: 'thyDisabled',
                description: '禁用',
                type: 'Boolean',
                default: 'false'
            }
        ]
    }
];

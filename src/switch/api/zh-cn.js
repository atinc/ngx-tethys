module.exports = [
    {
        type: 'component',
        name: 'thySwitch',
        description: '开关组件',
        properties: [
            {
                name: 'thyType',
                description: `类型，目前分为：'info' | 'warning' | 'danger'，默认不传`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thySize',
                description: `大小，目前可传的大小为： 'sm' | 'lg'，默认不传`,
                type: 'string',
                default: '-'
            },
            {
                name: 'thyDisabled',
                description: `禁用状态`,
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];

module.exports = [
    {
        type: 'component',
        name: 'thy-switch',
        description: '开关组件',
        properties: [
            {
                name: 'thyType',
                description: `类型，目前分为：'primary' |'info' | 'warning' | 'danger'`,
                type: 'string',
                default: 'primary'
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
            },
            {
                name: '[(ngModel)]',
                description: '绑定开关的状态值',
                type: 'boolean',
                default: 'false'
            },
            {
                name: '(ngModelChange)',
                description: '开关状态发生改变的回调',
                type: 'function',
                default: ''
            }
        ]
    }
];

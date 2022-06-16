module.exports = [
    {
        type: 'component',
        name: 'thy-alert',
        description: '警告提示，展现需要关注的信息',
        properties: [
            {
                name: 'thyTheme',
                description: '指定警告提示的主题',
                type: `'fill' | 'bordered' | 'naked' `,
                default: 'fill'
            },
            {
                name: 'thyType',
                description: '指定警告提示的类型',
                type: `'primary' ｜ 'success' | 'warning' | 'danger' | 'info'`,
                default: 'info'
            },
            {
                name: 'thyMessage',
                description: '显示警告提示的内容',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIcon',
                description: '显示自定义图标，可传 true/false 控制是否显示图标，或者传字符串去指定图标名称',
                type: 'boolean | string',
                default: ''
            },
            {
                name: 'thyCloseable',
                description: '是否显示关闭警告框按钮，默认不显示',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'operation',
                description: '警告框自定义操作',
                type: 'ContentChild<TemplateRef>',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyAlertActionItem',
        description: '样式指令,可为警告内容添加自定义操作按钮样式',
        properties: []
    }
];

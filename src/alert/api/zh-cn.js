module.exports = [
    {
        type: 'component',
        name: 'thy-alert',
        description: '警告提示，展现需要关注的信息',
        properties: [
            {
                name: 'thyType',
                description: '指定警告提示的类型',
                type: `'success' | 'warning' | 'danger' | 'info' | 'primary-week' | 
                'success-week' | 'warning-week' | 'danger-week'`,
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
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyAlertActionItem',
        description: '样式指令,可为警告内容添加自定义操作按钮',
        properties: []
    }
];

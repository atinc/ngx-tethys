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
                description: '警告提示的内容',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIcon',
                description: '自定义图标类型，true/false 控制是否显示图标，当为字符串时，指定图标的名称',
                type: 'boolean | string',
                default: ''
            },
            {
                name: 'thyCloseable',
                description: '默认不显示关闭警告框按钮',
                type: 'boolean',
                default: 'false'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyAlertActionItem',
        description: '样式指令,为警告内容的操作按钮添加样式',
        properties: []
    }
];

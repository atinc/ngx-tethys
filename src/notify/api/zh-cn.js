module.exports = [
    {
        type: 'CLASS',
        name: 'ThyNotifyOption参数',
        properties: [
            {
                name: 'id',
                description: `提示通知的唯一标识符`,
                type: 'string',
                default: ''
            },
            {
                name: 'type',
                description: `弹出通知的类型`,
                type: `'blank' | 'success' | 'error' | 'warning' | 'info'`,
                default: ''
            },
            {
                name: 'title',
                description: `标题`,
                type: 'string',
                default: ''
            },
            {
                name: 'content',
                description: `提示内容`,
                type: 'string',
                default: ''
            },
            {
                name: 'detail',
                description: `提示内容的详情，是对内容的详情描述`,
                type: 'string',
                default: ''
            },
            {
                name: 'html',
                description: `自定义传入html模板`,
                type: 'ElementRef',
                default: ''
            },
            {
                name: 'pauseOnHover',
                description: `鼠标移上时禁止自动移除`,
                type: 'boolean',
                default: ''
            },
            {
                name: 'duration',
                description: `持续时间（毫秒），当设置为0时不消失`,
                type: 'number',
                default: ''
            },
            {
                name: 'maxStack',
                description: `同一时间可展示的最大提示数量`,
                type: 'number',
                default: ''
            },
            {
                name: 'placement',
                description: `通知弹出位置`,
                type: `'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'`,
                default: 'topRight'
            }
        ]
    }
];

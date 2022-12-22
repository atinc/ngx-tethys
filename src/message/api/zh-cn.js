module.exports = [
    {
        type: 'CLASS',
        name: 'ThyMessageOption 参数',
        properties: [
            {
                name: 'id',
                description: '弹出 Message 的唯一标识符',
                type: 'string',
                default: ''
            },
            {
                name: 'type',
                description: '弹出 Message 的类型',
                type: 'success' | 'error' | 'warning' | 'info' | 'loading',
                default: 'success'
            },
            {
                name: 'content',
                description: 'Message 的内容',
                type: 'string',
                default: ''
            },
            {
                name: 'pauseOnHover',
                description: '鼠标移上时禁止自动移除',
                type: 'boolean',
                default: ''
            },
            {
                name: 'duration',
                description: '持续时间（毫秒），当设置为0时不消失',
                type: 'number',
                default: ''
            }
        ]
    },
    {
        type: 'SERVICE',
        name: 'ThyNotifyService',
        properties: [
            {
                name: 'show',
                description: '打开自定义配置的 Message',
                type: `(config: ThyMessageOption) => void`
            },
            {
                name: 'info',
                description: '打开类型为"info"的 Message',
                type: `(content: string, config?: ThyMessageOption) => ThyMessageRef`
            },
            {
                name: 'success',
                description: '打开类型为"success"的 Message',
                type: `(content: string, config?: ThyMessageOption) => ThyMessageRef`
            },
            {
                name: 'warning',
                description: '打开类型为"warning"的 Message',
                type: `(content: string, config?: ThyMessageOption) => ThyMessageRef`
            },
            {
                name: 'error',
                description: '打开类型为"error"的 Message',
                type: `(content: string, config?: ThyMessageOption) => ThyMessageRef`
            },
            {
                name: 'loading',
                description: '打开类型为"loading"的 Message',
                type: `(content: string, config?: ThyMessageOption) => ThyMessageRef`
            },
            {
                name: 'remove',
                description: '根据 id 移除 Message，不传 id 则移除全部',
                type: `(id?: string) => void`
            }
        ]
    },
    {
        type: 'CLASS',
        name: 'ThyMessageRef',
        properties: [
            {
                name: 'id',
                description: '打开的 Message 的 id',
                type: `string`
            },
            {
                name: 'onClose',
                description: '当打开的 Message 关闭时它会派发一个事件',
                type: `Subject<void>`
            }
        ]
    }
];

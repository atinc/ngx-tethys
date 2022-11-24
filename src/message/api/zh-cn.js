module.exports = [
    {
        type: 'CLASS',
        name: 'ThyMessageConfig参数',
        properties: [
            {
                name: 'id',
                description: '提示通知的唯一标识符',
                type: 'string',
                default: ''
            },
            {
                name: 'type',
                description: '弹出通知的类型',
                type: 'info' | 'success' | 'error' | 'warning' | 'loading',
                default: ''
            },
            {
                name: 'content',
                description: '提示内容',
                type: 'string',
                default: ''
            },
            {
                name: 'detail',
                description:
                    '提示内容的详情，是对内容的详情描述，也可以是能够操作的链接，link是链接名，content是详情描述，action是点击的方法',
                type: 'string | ThyMessageDetail',
                default: ''
            },
            {
                name: 'html',
                description: '自定义传入html模板',
                type: 'ElementRef',
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
            },
            {
                name: 'maxStack',
                description: '同一时间可展示的最大提示数量',
                type: 'number',
                default: ''
            }
        ]
    },
    {
        type: 'SERVICE',
        name: 'ThyMessageService',
        properties: [
            {
                name: 'open',
                description: '打开 Message',
                type: `(
                        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                        config?: ThyMessageConfig
                    ) => ThyMessageRef`,
                default: ''
            },
            {
                name: 'show',
                description: '打开自定义配置的 Message',
                type: `(config: ThyMessageConfig) => void`,
                default: ''
            },
            {
                name: 'success',
                description: '打开类型为"success"的 Message',
                type: `(content?: string, config?: ThyMessageConfig) => void`,
                default: '("", {type: "success"}) => void'
            },
            {
                name: 'loading',
                description: '打开类型为"loading"的 Message',
                type: `(content?: string, config?: ThyMessageConfig) => void`,
                default: '("", {type: "loading"}) => void'
            },
            {
                name: 'info',
                description: '打开类型为"info"的 Message',
                type: `(content?: string, config?: ThyMessageConfig) => void`,
                default: '("", { type: "info" }) => void'
            },
            {
                name: 'warning',
                description: '打开类型为"warning"的 Message',
                type: `(content?: string, config?: ThyMessageConfig) => void`,
                default: '("", { type: "warning" }) => void'
            },
            {
                name: 'error',
                description: '打开类型为"error"的 Message',
                type: `(content?: string, config?: ThyMessageConfig | string) => void`,
                default: '("", { type: "error" }) => void'
            },
            {
                name: 'removeMessageById',
                description: '根据 id 移除 Message',
                type: `(id: string) => void`,
                default: ''
            }
        ]
    }
];

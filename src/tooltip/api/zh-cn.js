module.exports = [
    {
        type: 'component',
        name: 'thy-tooltip',
        description: '用于文字提示',
        properties: [
            {
                name: 'thyTooltip',
                description: '提示消息，可以是文本，也可以是一个模版',
                type: 'string | TemplateRef<HTMLElement>',
                default: ''
            },
            {
                name: 'thyTooltipTrigger',
                description: '触发提示方式，hover, focus, click',
                type: 'string',
                default: 'hover'
            },
            {
                name: 'thyTooltipPlacement',
                description: '提示位置， top | bottom | left | right',
                type: 'string',
                default: 'top'
            },
            {
                name: 'thyTooltipDisabled',
                description: '是否禁用提示',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyTooltipClass',
                description: '提示内容自定义样式',
                type: 'string | string[]',
                default: ''
            },
            {
                name: 'thyTooltipShowDelay',
                description: '显示提示内容延迟毫秒',
                type: 'number',
                default: '200'
            },
            {
                name: 'thyTooltipHideDelay',
                description: '隐藏提示内容延迟毫秒',
                type: 'number',
                default: '100'
            },
            {
                name: 'thyTooltipTemplateContext',
                description: '传入template时，注入给template的数据',
                type: 'any',
                default: 'null'
            },
            {
                name: 'thyTooltipOffset',
                description: '偏移量',
                type: 'number',
                default: '4'
            },
            {
                name: 'thyTooltipPin',
                description: 'hover触发方式下 鼠标移入Tooltip是否固定Tooltip',
                type: 'boolean',
                default: false
            }
        ]
    }
];

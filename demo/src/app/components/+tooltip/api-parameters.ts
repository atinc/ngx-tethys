export const apiParameters = [
    {
        property: 'thyTooltip',
        description: '提示消息，可以是文本，也可以是一个模版',
        type: 'string | TemplateRef<HTMLElement>',
        default: ''
    },
    {
        property: 'thyTooltipTrigger',
        description: '触发提示方式，hover, focus, click',
        type: 'string',
        default: 'hover'
    },
    {
        property: 'thyTooltipPlacement',
        description: '提示位置， top | bottom | left | right',
        type: 'string',
        default: 'top'
    },
    {
        property: 'thyTooltipDisabled',
        description: '是否禁用提示',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyTooltipClass',
        description: '提示内容自定义样式',
        type: 'string | string[]',
        default: ''
    },
    {
        property: 'thyTooltipShowDelay',
        description: '显示提示内容延迟毫秒',
        type: 'number',
        default: '200'
    },
    {
        property: 'thyTooltipHideDelay',
        description: '隐藏提示内容延迟毫秒',
        type: 'number',
        default: '100'
    }
];

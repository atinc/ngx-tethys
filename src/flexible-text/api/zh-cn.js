module.exports = [
    {
        type: 'component',
        name: 'FlexibleText 文本提示',
        description: '两种使用方式：组件方式、指令方式。',
        properties: [
            {
                name: 'thyTooltipContent',
                description: '需要展示的全部内容',
                type: 'string | TemplateRef',
                default: ''
            },
            {
                name: 'thyTooltipPlacement',
                description: 'tooltip 的提示位置，top | bottom | left | right',
                type: 'string',
                default: 'top'
            },
            {
                type: 'string',
                name: 'thyTooltipTrigger',
                description: '触发提示方式，hover, focus, click',
                default: 'hover'
            },
            {
                type: 'string',
                name: 'thyContainerClass',
                description: '自定义class类，如果不设置默认会包含flexible-text-contianer',
                default: undefined
            }
        ]
    }
];

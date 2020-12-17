module.exports = [
    {
        type: 'component',
        name: 'thy-empty',
        description: '显示空状态组件',
        properties: [
            {
                name: 'thyMessage',
                description: `显示文本提示信息`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyTranslationKey',
                description: `显示文本提示信息多语言 Key`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyTranslationValues',
                description: `显示文本提示信息多语言 Key 的 Values`,
                type: 'object',
                default: ''
            },
            {
                name: 'thyEntityName',
                description: `显示默认提示信息，替换默认提示信息的目标对象，比如：没有 {thyEntityName}`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyEntityNameTranslateKey',
                description: `thyEntityName 的多语言 Key`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyIconName',
                description: `提示图标名`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyImageUrl',
                description: `提示图片链接`,
                type: 'string',
                default: ''
            },

            {
                name: 'thySize',
                description: `大小, md, lg`,
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyMarginTop',
                description: `margin-top`,
                type: 'number',
                default: ''
            },
            {
                name: 'thyTopAuto',
                description: `自动根据父容器计算高度，垂直居中`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyContainer',
                description: `自动计算高度传入父容器`,
                type: 'elementRef',
                default: ''
            },
            {
                name: 'extra',
                description: `除提示图片，文本外的其他信息传入模版`,
                type: 'templateRef',
                default: ''
            }
        ]
    }
];

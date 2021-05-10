module.exports = [
    {
        type: 'component',
        name: 'thy-empty',
        properties: [
            {
                name: 'thyMessage',
                description: `显示文本提示信息。同时传入 thyMessage，thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyTranslationKey',
                description: `显示文本提示信息多语言 Key。同时传入 thyTranslationKey，thyEntityName，thyEntityNameTranslateKey 时优先级最高`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyTranslationValues',
                description: `显示文本提示信息多语言 Key 的 Values。传入 thyTranslationKey 后，传入这个才会生效`,
                type: 'object',
                default: ''
            },
            {
                name: 'thyEntityName',
                description: `显示默认提示信息，替换默认提示信息的目标对象，比如：没有 {thyEntityName}。同时传入 thyEntityName，thyEntityNameTranslateKey 时优先级较高`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyEntityNameTranslateKey',
                description: `thyEntityName 的多语言 Key。thyMessage，thyTranslationKey，thyEntityName 均未传入时才会生效`,
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
                description: `大小, md, lg, sm`,
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyMarginTop',
                description: `距上距离`,
                type: 'number',
                default: ''
            },
            {
                name: 'thyTopAuto',
                description: `是否自动根据父容器计算高度，垂直居中`,
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyContainer',
                description: `自动计算高度垂直居中(即 thyTopAuto 为 true)时，支持传入自定义父容器`,
                type: 'ElementRef',
                default: ''
            },
            {
                name: 'extra',
                description: `除提示图片，文本外的其他信息传入模板`,
                type: 'TemplateRef<any>',
                default: ''
            },
            {
                name: 'thyDescription',
                description: `显示文本描述`,
                type: 'string',
                default: ''
            }
        ]
    }
];

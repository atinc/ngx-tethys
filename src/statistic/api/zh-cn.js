module.exports = [
    {
        type: 'component',
        name: 'thy-progress',
        description: '用于进度条的展示',
        properties: [
            {
                name: 'thyValue',
                description: '数值内容',
                type: 'number | string'
            },
            {
                name: 'thyPrefix',
                description: '设置数值的前缀',
                type: 'string'
            },
            {
                name: 'thySuffix',
                description: '设置数值的后缀',
                type: 'string'
            },
            {
                name: 'thyTitle',
                description: '数值的标题',
                type: 'string'
            },
            {
                name: 'thyTitlePosition',
                description: '标题的位置',
                type: 'top | bottom',
                default: 'bottom'
            },
            {
                name: 'thyShape',
                description: '形状（card）',
                type: 'card',
                default: ''
            },
            {
                name: 'thyValueStyle',
                description: '设置数值的样式',
                type: 'object'
            },
            {
                name: 'thySize',
                description: '前缀和数值字体大小',
                type: 'default',
                default: 'default'
            },
            {
                name: 'thyColor',
                description: '主题颜色(primary，#fa8b7c)',
                type: 'primary | success | warning | danger | info 或 string'
            },
            {
                name: 'thyValueTemplate',
                description: '自定义数值展示',
                type: 'TemplateRef'
            },
            {
                name: 'thyPrefixTemplate',
                description: '自定义数值前缀展示',
                type: 'TemplateRef'
            },
            {
                name: 'thySuffixTemplate',
                description: '自定义数值后缀展示',
                type: 'TemplateRef'
            },
            {
                name: 'thyTitleTemplate',
                description: '自定义数值标题展示',
                type: 'TemplateRef'
            }
        ]
    }
];

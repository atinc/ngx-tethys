module.exports = [
    {
        type: 'component',
        name: 'thy-progress',
        description: '用于进度条的展示',
        properties: [
            {
                name: 'thyType',
                description: '进度条类型， info, success, warning, danger, primary',
                type: 'ThyProgressTypes | string',
                default: 'primary'
            },
            {
                name: 'thySize',
                description: '进度条的大小，Sizes: sm, md, xs',
                type: 'string',
                default: 'md'
            },
            {
                name: 'thyValue',
                description: '进度值，为数字时显示百分比 = value / max * 100, 当 thyValue 为数组时显示多个 bar，stacked 进度条',
                type: 'number | ThyStackedValue[] ({ value: number, type?: ThyProgressTypes, color: string, label: string})',
                default: 'None'
            },
            {
                name: 'thyMax',
                description: '最大值，主要提供计算百分比进度，当 thyValue 为 stacked 进度条时，自动累加数组中的 value 之和为 max',
                type: 'number',
                default: '100'
            },
            {
                name: 'thyTips',
                description: '鼠标移入progress bar时显示的tooltips模板',
                type: 'template',
                default: 'null'
            }
        ]
    }
];

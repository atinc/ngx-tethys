module.exports = [
    {
        type: 'component',
        name: 'thy-arrow-switcher',
        description: '切换上一条下一条',
        properties: [
            {
                name: 'ngModel',
                description: '双向绑定值，当前条数的index（设置为0，展示为1）',
                type: 'number',
                default: '-'
            },
            {
                name: 'thyTotal',
                description: '总条数',
                type: 'number',
                default: '-'
            },
            {
                name: 'thyTheme',
                description: '展示主题,可选值为： 默认`default`  轻量`lite`',
                type: 'string',
                default: 'default'
            },
            {
                name: 'thySize',
                description: '尺寸大小,默认尺寸为大号，取值为sm时展示小号',
                type: 'string',
                default: '-'
            },
            {
                name: 'disabled',
                description: '是否禁用按钮，设置之后，前后切换都被禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyPrevious',
                description: '点击上一条事件',
                type: 'EventEmitter<ThyArrowSwitcherEvent>',
                default: '$event: { index: number, event: Event}'
            },
            {
                name: 'thyNext',
                description: '点击下一条事件',
                type: 'EventEmitter<ThyArrowSwitcherEvent>',
                default: '$event: { index: number, event: Event}'
            },
            {
                name: 'thyPreviousTooltip',
                description: '设置上一条 Hover Tooltip 提示 ',
                type: 'string',
                default: '-'
            },
            {
                name: 'thyNextTooltip',
                description: '设置下一条 Hover Tooltip 提示 ',
                type: 'string',
                default: '-'
            }
        ]
    }
];

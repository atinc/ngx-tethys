module.exports = [
    {
        type: 'component',
        name: 'thy-timeline',
        description: '时间轴',
        properties: [
            {
                name: 'thyReverse',
                description: '节点排序',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyMode',
                description: '改变时间轴和内容的相对位置 left | right | center',
                type: 'string',
                default: 'left'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-timeline-item 参数列表',
        description: '设置时间轴的节点',
        properties: [
            {
                name: 'thyColor',
                description: '指定圆圈颜色 primary | success | warning | danger',
                type: 'string',
                default: 'primary'
            },
            {
                name: 'dot',
                description: '自定义时间轴点',
                type: 'TemplateRef',
                default: 'null'
            },
            {
                name: 'thyPosition',
                description: '自定义节点位置 left | right',
                type: 'string',
                default: 'null'
            },
            {
                name: 'description',
                description: '自定义另一侧的模版',
                type: 'TemplateRef',
                default: 'null'
            }
        ]
    }
];

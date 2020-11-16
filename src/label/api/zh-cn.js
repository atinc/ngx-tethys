module.exports = [
    {
        type: 'directive',
        name: 'thyLabel',
        properties: [
            {
                name: 'thyLabel',
                description:
                    '标签类型（default、primary、success、info、danger、emboss-default、emboss-primary、emboss-warning、emboss-danger、outline）',
                type: 'String',
                default: ''
            },
            {
                name: 'thySize',
                description: '大小有sm、default、md、lg，对应大小为：20px、22px、24px、26px, 默认为 default',
                type: 'String',
                default: ''
            },
            {
                name: 'thyLabelType',
                description: '状态标签（state、pill）',
                type: 'String',
                default: 'state'
            },
            {
                name: 'thyHasHover',
                description: '滑过效果',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyBeforeIcon',
                description: '可在显示文案前添加图标,如添加图标',
                type: 'String',
                default: ''
            },
            {
                name: 'thyAfterIcon',
                description: '可在显示文案后添加图标，如删除图标',
                type: 'String',
                default: ''
            },
            {
                name: '[thyLabelColor]',
                description: '自定义颜色，#f969aa 或者变量，需要同时加上 thyLabel 属性',
                type: 'String',
                default: ''
            },
            {
                name: 'thyOnRemove',
                description: '可做移除标签操作',
                type: 'Event',
                default: ''
            }
        ]
    }
];

module.exports = [
    {
        type: 'component',
        name: 'thy-segmented',
        description: '分段控制器',
        properties: [
            {
                name: 'thySize',
                type: 'string',
                default: 'default',
                description: `支持设置大小: 'xs' | 'sm' | 'md' | 'default'`
            },
            {
                name: 'thyMode',
                type: 'string',
                default: 'block',
                description: `支持两种模式: <br/> 'block': 分段控制器的宽度适应父元素的宽度。<br/>'adaptive': 根据文字的多少自适应宽度。 `
            },
            {
                name: 'thyDisabled',
                type: 'boolean',
                default: 'false',
                description: '禁用分段控制器'
            },
            {
                name: 'thyActiveIndex',
                type: 'number',
                default: '0',
                description: '默认选中的选项的索引'
            },
            {
                name: '(thySelectChange)',
                type: 'EventEmitter<ThySegmentedEvent>',
                default: '',
                description: '选项被选中的回调事件'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-segmented-item',
        description: '分段控制器的选项',
        properties: [
            {
                name: 'thyValue',
                type: 'string',
                default: '',
                description: '选项的值'
            },
            {
                name: 'thyIconName',
                type: 'string',
                default: '',
                description: '选项的图标'
            },
            {
                name: 'thyLabelText',
                type: 'string',
                default: '',
                description: '选项的文本'
            },
            {
                name: 'thyDisabled',
                type: 'boolean',
                default: 'false',
                description: '禁用该选项'
            }
        ]
    }
];

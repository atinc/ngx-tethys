module.exports = [
    {
        type: 'component',
        name: 'thy-segmented',
        description: '分段控制器',
        properties: [
            {
                name: 'thyOptions',
                type: 'thySegmentedOption[] | string[] | number[]',
                default: '[]',
                description: '配置分段控制器的选项'
            },
            {
                name: 'thySize',
                type: 'string',
                default: 'default',
                description: `大小，目前可传的大小为: 'xs' | 'sm' | 'md' | 'default'`
            },
            {
                name: 'thyMode',
                type: 'string',
                default: 'block',
                description: `支持有两种模式，分别为: <br/> 'block': 分段控制器的宽度适应父元素的宽度。<br/>'adaptive': 根据文字的多少自适应宽度。 `
            },
            {
                name: 'thyDisabled',
                type: 'boolean',
                default: 'false',
                description: '禁用分段控制器'
            },
            {
                name: 'thyActive',
                type: 'number',
                default: '0',
                description: '当前激活的选项的索引'
            },
            {
                name: 'thyLabelTemplate',
                type: 'TemplateRef',
                default: '',
                description: '自定义选项的渲染模板'
            },
            {
                name: '(thyOptionSelect)',
                type: 'EventEmitter<ThySegmentedEvent>',
                default: '',
                description: '选项被选中的回调事件'
            },
            {
                name: '[(ngModel)]',
                type: 'number',
                default: '0',
                description: '绑定当前选中选项的索引'
            },
            {
                name: '(ngModelChange)',
                type: 'EventEmitter<number>',
                default: '',
                description: '当前选中的选项发生改变的回调'
            }
        ]
    }
];

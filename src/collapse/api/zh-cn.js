module.exports = [
    {
        type: 'component',
        name: 'thy-collapse',
        properties: [
            {
                name: 'thyAccordion',
                type: 'boolean',
                default: 'false',
                description: `是否每次只打开一个tab`
            },
            {
                name: 'thyTheme',
                type: 'divided' | 'bordered' | 'ghost',
                default: 'divided',
                description: `设置主题支持不同样式的折叠面板`
            },
            {
                name: 'thyExpandIconPosition',
                type: 'left | right',
                default: 'left',
                description: `设置图标位置`
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-collapse-panel',
        properties: [
            {
                name: 'thyDisabled',
                type: 'boolean',
                default: 'false',
                description: `禁用折叠面板的展开交互`
            },
            {
                name: 'thyTitle',
                type: 'string',
                default: '',
                description: `面板头部名称`
            },
            {
                name: 'thyHeaderTemplate',
                type: 'TemplateRef',
                default: '',
                description: `面板头部模板`
            },
            {
                name: 'thyExpandedIcon',
                type: 'string | TemplateRef',
                default: `'angle-right'`,
                description: `面板折叠/展开图标或图标模版`
            },
            {
                name: 'thyExtraTemplate',
                type: 'TemplateRef',
                default: 'true',
                description: `面板右上角内容模版`
            },
            {
                name: 'thyShowArrow',
                type: 'boolean',
                default: 'true',
                description: `是否展示箭头`
            },
            {
                name: 'thyActive',
                type: 'boolean',
                default: 'false',
                description: `面板是否展开，可双向绑定`
            }
        ]
    }
];

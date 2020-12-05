module.exports = [
    {
        type: 'component',
        name: 'thy-grid',
        description: 'Grid 列表',
        properties: [
            {
                name: 'thyModel',
                description: 'Grid 数据源',
                type: 'Object[]',
                default: ''
            },
            {
                name: 'thyRowKey',
                description: '设置每行数据的唯一标识属性名',
                type: 'String',
                default: '_id'
            },
            { name: 'thyMode', description: 'Grid 展示方式，分组或列表', type: 'list | group | tree', default: 'list' },
            { name: 'thyGroupBy', description: 'Grid分组展示时分组key ', type: 'string', default: '' },
            {
                name: 'thyTheme',
                description: '设置Grid的显示风格 可选值 [default , bordered]',
                type: 'String',
                default: 'default'
            },
            {
                name: 'thySize',
                description: '设置Grid的行高，可选值为[default , sm], 设置sm时行高为44px',
                type: 'String',
                default: 'default'
            },
            {
                name: 'thyClassName',
                description: '设置Grid中使用的Table的Class',
                type: 'String',
                default: ''
            },
            {
                name: 'thyLoadingDone',
                description: '设置加载状态',
                type: 'Boolean',
                default: 'true'
            },
            {
                name: 'thyLoadingText',
                description: '设置加载显示的文本',
                type: 'String',
                default: ''
            },
            {
                name: 'thyEmptyOptions',
                description: '配置空状态组件',
                type: 'ThyGridEmptyOptions',
                default: ''
            },
            {
                name: 'thyFilter',
                description: '设置Grid过滤条件（暂未实现功能）',
                type: 'Object | Function',
                default: ''
            },
            {
                name: 'thyPageIndex',
                description: '设置当前页',
                type: 'Number',
                default: '1'
            },
            {
                name: 'thyPageSize',
                description: '设置每页显示数量',
                type: 'Number',
                default: '20'
            },
            {
                name: 'thyPageTotal',
                description: '设置总页数',
                type: 'Number',
                default: ''
            },
            {
                name: 'thyShowTotal',
                description: `是否显示左侧total`,
                type: 'Boolean | Template',
                default: 'false'
            },
            {
                name: 'thyDraggable',
                description: '开启Grid拖拽',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyHoverDisplayOperation',
                description: '开启Hover后显示操作',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyWholeRowSelect',
                description: '设置开启选中当前行自动选中checkbox',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyShowHeader',
                description: '是否显示header',
                type: 'Boolean',
                default: 'true'
            },
            {
                name: 'thyIndent',
                description: '设置Tree树状数据展示时的缩进',
                type: 'Number',
                default: '20'
            },
            {
                name: 'thyChildrenKey',
                description: '设置Tree树状数据对象中的子节点 key',
                type: 'String',
                default: 'children'
            },
            {
                name: '(thyOnRowClick)',
                description: 'Grid行点击事件',
                type: 'ThyGridRowEvent',
                default: ''
            },
            {
                name: '(thyOnPageChange)',
                description: '翻页回调事件',
                type: 'PageChangedEvent',
                default: ''
            },
            {
                name: '(thyOnMultiSelectChange)',
                description: '多选回调事件',
                type: 'ThyMultiSelectEvent',
                default: ''
            },
            {
                name: '(thyOnRadioSelectChange)',
                description: '单选回调事件',
                type: 'ThyRadioSelectEvent',
                default: ''
            },
            {
                name: '(thyOnSwitchChange)',
                description: '切换组件回调事件',
                type: 'ThySwitchEvent',
                default: ''
            },
            {
                name: '(thyOnDraggableChange)',
                description: '拖动修改事件',
                type: 'ThyGridDraggableEvent',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-grid-column',
        description: 'Grid Column',
        properties: [
            {
                name: 'thyModelKey',
                description: '设置数据属性Key',
                type: 'String',
                default: ''
            },
            {
                name: 'thyTitle',
                description: '设置列名',
                type: 'String',
                default: ''
            },
            {
                name: 'thyWidth',
                description: '设置列的宽度',
                type: 'String | Number',
                default: ''
            },
            {
                name: 'thyClassName',
                description: '设置列的Class',
                type: 'String',
                default: ''
            },
            {
                name: 'thyHeaderClassName',
                description: '是指列头部的Class',
                type: 'String',
                default: ''
            },
            {
                name: 'thyType',
                description: '设置列的类型 index:序列 ，checkbox:多选 ，radio:单选 ，switch:切换',
                type: 'String',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '设置自定义类型的禁用状态',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thySelections',
                description:
                    'checkbox radio 类型的列可设置选中的数据 ，支持 单个对象 单个Id  同时支持多个Id [_id1,_id2] 多个对象 [{_id:1},{_id:2}]',
                type: 'String | Number | Object | String[] | Number[] | Object[] ',
                default: ''
            },
            {
                name: 'thyDefaultText',
                description: '设置数据为空的时候显示的文本',
                type: 'String',
                default: ''
            },
            {
                name: 'thyExpand',
                description: '设置 tree 模式下折叠展开按钮展示列，不传默认第一列',
                type: 'boolean',
                default: 'false'
            }
        ]
    }
];

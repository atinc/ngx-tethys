module.exports = [
    {
        type: 'component',
        name: 'thy-table',
        description: 'Table 表格',
        properties: [
            {
                name: 'thyModel',
                description: '数据源',
                type: 'object[]',
                default: ''
            },
            {
                name: 'thyRowKey',
                description: '设置每行数据的唯一标识属性名',
                type: 'string',
                default: '_id'
            },
            { name: 'thyMode', description: '表格展示方式，列表/分组/树', type: 'list | group | tree', default: 'list' },
            { name: 'thyGroupBy', description: 'thyMode 为分组展示时分组的 Key ', type: 'string', default: '' },
            {
                name: 'thyTheme',
                description: '表格的显示风格，bordered 时头部有背景色且分割线区别明显',
                type: 'default | bordered',
                default: 'default'
            },
            {
                name: 'thySize',
                description: `表格大小，'xs' | 'sm' | 'md' | 'lg' | 'xlg' 默认为 'md'`,
                type: `'xs' | 'sm' | 'md' | 'lg' | 'xlg'`,
                default: 'default'
            },
            {
                name: 'thyClassName',
                description: '设置 Table 的 Class',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLoadingDone',
                description: '设置加载状态',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyLoadingText',
                description: '设置加载时显示的文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyEmptyOptions',
                description: '配置空状态组件',
                type: 'ThyTableEmptyOptions',
                default: ''
            },
            {
                name: 'thyFilter',
                description: '设置过滤条件（暂未实现功能）',
                type: 'Object | Function',
                default: ''
            },
            {
                name: 'thyPageIndex',
                description: '设置当前页码',
                type: 'number',
                default: '1'
            },
            {
                name: 'thyPageSize',
                description: '设置每页显示数量',
                type: 'number',
                default: '20'
            },
            {
                name: 'thyPageTotal',
                description: '设置总页数',
                type: 'number',
                default: ''
            },
            {
                name: 'thyShowTotal',
                description: `是否显示左侧 Total`,
                type: 'boolean | TemplateRef',
                default: 'false'
            },
            {
                name: 'thyDraggable',
                description: '是否开启行拖拽',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyHoverDisplayOperation',
                description: '开启 Hover 后显示操作，默认不显示操作区内容，鼠标 Hover 时展示',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyWholeRowSelect',
                description: '选中当前行是否自动选中 Checkbox，不开启时只有点击 Checkbox 列时才会触发选中',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyShowHeader',
                description: '是否显示表格头',
                type: 'boolean',
                default: 'true'
            },
            {
                name: 'thyIndent',
                description: 'thyMode 为 tree 时，设置 Tree 树状数据展示时的缩进',
                type: 'number',
                default: '20'
            },
            {
                name: 'thyChildrenKey',
                description: 'thyMode 为 tree 时，设置 Tree 树状数据对象中的子节点 Key',
                type: 'string',
                default: 'children'
            },
            {
                name: 'empty',
                description: '设置数据为空时展示的模板',
                type: 'TemplateRef',
                default: ''
            },
            {
                name: '(thyOnRowClick)',
                description: '表格行点击触发事件',
                type: 'ThyTableRowEvent',
                default: ''
            },
            {
                name: '(thyOnPageChange)',
                description: '表格分页回调事件',
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
                type: 'ThyTableDraggableEvent',
                default: ''
            },
            {
                name: '(thySortChange)',
                description: '列排序修改事件',
                type: 'ThyTableSortEvent',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-table-column',
        description: 'Grid Column',
        properties: [
            {
                name: 'thyModelKey',
                description: '设置数据属性 Key，读取数组中对象的当前 Key 值',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTitle',
                description: '设置列名，显示在表头',
                type: 'string',
                default: ''
            },
            {
                name: 'thyWidth',
                description: '设置列的宽度',
                type: 'string | number',
                default: ''
            },
            {
                name: 'thyClassName',
                description: '设置列的 Class，即 td 元素上的样式',
                type: 'string',
                default: ''
            },
            {
                name: 'thyOperational',
                description: '当前列是操作列，设置为 true 时会追加 thy-operation-links 样式类，文字居中',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thySecondary',
                description: '当前列是次要列，设置为 true 时会追加 thy-table-column-secondary 样式类，文字颜色为 $gray-600',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyHeaderClassName',
                description: '设置列头部的 Class，即 th 元素上的样式',
                type: 'string',
                default: ''
            },
            {
                name: 'thyType',
                description: '设置列的特殊类型，序列号、选择框、单选框、切换按钮',
                type: '"index" | "checkbox" | "radio" | "switch"',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '设置自定义类型的禁用状态',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thySelections',
                description: `thyType 为 checkbox 或者 radio 类型时选中的数据 ，支持单个对象，单个 Id，同时支持多个 Id，多个对象`,
                type: 'string | number | object | string[] | number[] | object[] ',
                default: ''
            },
            {
                name: 'thyDefaultText',
                description: '设置数据为空的时候显示的文本',
                type: 'string',
                default: ''
            },
            {
                name: 'thyExpand',
                description: '设置 Tree 模式下折叠展开按钮展示列，不传默认第一列',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyFixed',
                description: '设置固定列',
                type: 'left | right',
                default: '-'
            },
            {
                name: 'thySortable',
                description: '是否开启列排序功能（开启时 thyModelKey 为 必传）',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thySortDirection',
                description: '默认列排序顺序',
                type: 'desc | asc',
                default: '-'
            },
            {
                name: '(thySortChange)',
                description: '列排序修改事件',
                type: 'ThyTableSortEvent',
                default: ''
            }
        ]
    }
];

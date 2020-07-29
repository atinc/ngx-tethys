module.exports = [
    {
        type: 'component',
        name: 'Pagination 参数列表',
        description: '分页组件，当数据量过多时，使用分页分解数据。',
        properties: [
            {
                type: 'number',
                name: '[(thyPageIndex)]',
                description: `设置当前页，支持双向绑定`,
                default: '1'
            },
            {
                type: 'number',
                name: '[thyPageSize]',
                description: `每页条目数量`,
                default: '20'
            },
            {
                name: '[thyTotal]',
                description: `总页数 与 totalPages 二选一传入`,
                type: 'number',
                default: '-'
            },
            {
                type: 'string',
                name: '[thySize]',
                description: `设置分页组件的大小 可选值：'sm' | 'lg'`,
                default: '-'
            },
            {
                type: 'number',
                name: '[thyMarginalCount]',
                description: `设置边缘显示数量`,
                default: '2'
            },
            {
                type: 'number',
                name: '[thyRangeCount]',
                description: `设置中间区域显示数量`,
                default: '7'
            },
            {
                type: 'number',
                name: '[thyMaxCount]',
                description: `设置最大显示数量，超出最大显示数后会自动进行分割显示`,
                default: '9'
            },
            {
                type: 'boolean',
                name: '[thyDisabled]',
                description: `禁用`,
                default: 'false'
            },
            {
                type: 'boolean',
                name: '[thyShowQuickJumper]',
                description: `显示快速跳转`,
                default: 'false'
            },
            {
                type: 'boolean',
                name: '[thyHideOnSinglePage]',
                description: `只有一页时是否隐藏分页器`,
                default: 'false'
            },
            {
                type: 'ThyPaginationChangedEvent: { page }',
                name: '(thyPageChanged)',
                description: `与Bootstrap pagination 兼容，后续版本会进行删除，参数保持与 bootstrap 一致`,
                default: '-'
            },
            {
                type: 'ThyPaginationChangedEvent: number',
                name: '(thyPageIndexChange)',
                description: `页码改变的回调`,
                default: '-'
            },
            {
                type: 'boolean | template',
                name: '[thyShowTotal]',
                description: `是否显示左侧total`,
                default: 'false'
            }
        ]
    },
    {
        type: 'service',
        name: 'PaginationConfig 参数列表',
        description: '分页配置参数，需要一个初始化的默认值，用于设置分页的具体样式和分页首次加载后的默认显示',
        properties: [
            {
                type: 'boolean',
                name: 'boundaryLinks',
                description: `是否显示第一页和最后一页`,
                default: 'false'
            },
            {
                type: 'boolean',
                name: 'directionLinks',
                description: `是否显示上一页和下一页`,
                default: 'true'
            },
            {
                type: 'number',
                name: 'pageSize',
                description: `设置默认每页显示条数`,
                default: '20'
            },
            {
                name: 'maxCount',
                description: `设置最大显示数量，超出最大显示数后会自动进行分割显示`,
                type: 'Number',
                default: '9'
            },
            {
                name: 'showQuickJumper',
                description: `设置是否显示快速跳转`,
                type: 'Boolean',
                default: 'false'
            },
            {
                type: 'string',
                name: 'firstText',
                description: `第一页按钮显示文本`,
                default: '第一页'
            },
            {
                type: 'string',
                name: 'lastText',
                description: `最后一页按钮显示文本`,
                default: '最后一页'
            },
            {
                type: 'string',
                name: 'previousText',
                description: `上一页显示文本`,
                default: '上一页'
            },
            {
                type: 'string',
                name: 'nextText',
                description: `下一页显示文本`,
                default: '下一页'
            },
            {
                type: 'string',
                name: 'firstIcon',
                description: `第一页按钮显示图标`,
                default: '-'
            },
            {
                name: 'lastIcon',
                description: `最后一页按钮显示图标`,
                type: 'String',
                default: '-'
            },
            {
                type: 'string',
                name: 'previousIcon',
                description: `上一页显示图标`,
                default: '-'
            },
            {
                type: 'string',
                name: 'nextIcon',
                description: `下一页显示图标`,
                default: '-'
            },
            {
                type: 'string',
                name: 'totalPagesFormat',
                description: `设置总页数显示格式`,
                default: '共{total}页'
            }
        ]
    }
];

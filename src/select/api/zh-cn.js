module.exports = [
    {
        type: 'component',
        name: 'thy-custom-select',
        properties: [
            {
                name: 'thySize',
                description: '大小，sm | md | lg',
                type: 'String',
                default: ''
            },
            {
                name: 'thyShowSearch',
                description: '下拉列表是否显示搜索框',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyPlaceHolder',
                description: '选择框默认文字',
                type: 'string',
                default: ''
            },
            {
                name: 'thyServerSearch',
                description: '是否使用服务端搜索，当为 true 时，将不再在前端进行过滤',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyOnSearch',
                description: '搜索时回调',
                type: '(searchText:string)=>{}'
            },
            {
                name: 'thyMode',
                description: '下拉选择模式',
                type: '"" | multiple',
                default: ''
            },
            {
                name: 'thyAllowClear',
                description: '单选(thyMode=""或者不设置)时，选择框支持清除',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyEmptyStateText',
                description: '数据为空时显示的提示文字',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '是否禁用，如果使用了 ngModel，也可以使用 disabled 属性',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyEnableScrollLoad',
                description: '滚动加载是否可用, 只能当这个参数可以，下面的thyOnScrollToBottom事件才会触发',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyOnScrollToBottom',
                description: 'output event: 下拉菜单滚动到底部事件，可以用这个事件实现滚动加载',
                type: '()=>{}'
            },
            {
                name: 'thyOnExpandStatusChange',
                description: 'output event: 下拉菜单展开和折叠状态事件',
                type: '(openStatus: boolean)=>{}'
            },
            {
                name: 'thyFooterTemplate',
                description: 'Footer模板，默认值为空不显示Footer',
                type: 'TemplateRef<any>'
            },
            {
                name: 'thyFooterClass',
                description: '自定义Footer模板容器Class',
                default: 'thy-custom-select-footer'
            },
            {
                name: 'thyLoadState',
                description: '异步加载loading状态，false表示加载中，true表示加载完成',
                type: 'boolean',
                default: 'true'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-option',
        properties: [
            {
                name: 'thyValue',
                description: '每个option的value值',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLabelText',
                description: '每个option的label，用于显示',
                type: 'string',
                default: ''
            },
            {
                name: 'thyShowOptionCustom',
                description: '是否自定义展示option内容',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thySearchKey',
                description:
                    '传入搜索需要的关键字，支持多个关键字（“{{display_name}},{{name}},{{pin_yin}}”），如不传则默认按照label进行搜索,此为前端过滤',
                type: 'string',
                default: ''
            },
            {
                name: 'thyDisabled',
                description: '是否禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thySortComparator',
                description: '排序比较函数',
                type: 'function',
                default: undefined
            }
        ]
    }
];

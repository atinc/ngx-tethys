module.exports = [
    {
        type: 'component',
        name: 'thy-menu-group',
        description: '菜单分组，支持组件`thy-menu-group`和`<div thyMenuGroup></div>`两种形式',
        properties: [
            {
                name: 'thyTitle',
                description: '分组标题',
                type: 'String',
                default: ''
            },
            {
                name: 'thyExpand',
                description: '默认是否展开',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyShowIcon',
                description: '是否标题前面的图标',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyIcon',
                description: '标题前面的图标class',
                type: 'String',
                default: 'wtf wtf-drive-o'
            },
            {
                name: 'thyShowAction',
                description: '是否显示右侧图标',
                type: 'Boolean',
                default: 'false'
            },
            {
                name: 'thyActionMenu',
                description: '点击右侧图标弹出菜单',
                type: 'TemplateRef',
                default: ''
            },
            {
                name: 'thyActionIcon',
                description: '右侧图标class',
                type: 'String',
                default: ''
            },
            {
                name: 'thyOnActionClick',
                description: '点击操作图标事件, 如果设置了菜单，显示菜单优先',
                type: 'Event',
                default: ''
            }
        ]
    },
    {
        type: 'DIRECTIVE',
        name: 'thyMenuItemIcon',
        properties: [
            {
                name: 'thyColor',
                description: '设置图标颜色',
                type: 'String',
                default: '$primary'
            }
        ]
    },
    {
        type: 'DIRECTIVE',
        name: 'thyMenuItemAction',

        properties: [
            {
                name: 'thyActionMenu',
                description: '点击右侧图标弹出菜单',
                type: 'TemplateRef | ComponentType<T>',
                default: ''
            },
            {
                name: 'thyStopPropagation',
                description: '是否阻止冒泡',
                type: 'boolean',
                default: 'true'
            }
        ]
    }
];

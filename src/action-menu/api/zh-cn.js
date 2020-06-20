module.exports = [
    {
        type: 'component',
        name: 'thy-action-menu',
        description: '操作菜单，用于`Popover`弹出菜单',
        properties: [
            {
                name: 'thyTheme',
                type: `'default' | 'group'`,
                default: 'default',
                description: '操作菜单主题，支持默认和分组的形式'
            },
            {
                name: 'thyWidth',
                type: `number`,
                default: '-',
                description: '菜单宽度，默认 $action-menu-width: 240px'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-action-menu-group',
        properties: [
            {
                name: 'thyTitle',
                type: `string`,
                description: '分组的标题'
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-action-menu-divider',
        description: '操作菜单的分割线',
        properties: []
    },
    {
        type: 'directive',
        name: 'thyActionMenuItem',
        description: '操作菜单项',
        properties: [
            {
                name: 'thyType',
                type: `string`,
                default: `null`,
                description: '菜单的类型，danger | success'
            },
            {
                name: 'thyDisabled',
                type: `boolean`,
                default: 'false',
                description: '是否禁用'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyActionMenuItemActive',
        description: '操作菜单项激活指令',
        properties: [
            {
                name: 'thyActionMenuItemActive',
                type: `boolean`,
                default: `false`,
                description: '是否激活的表达式'
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyActionMenuSubItem',
        description: '操作子菜单',
        properties: [
            {
                name: 'thyActionMenuSubItem',
                type: `string`,
                default: `right`,
                description: '子菜单展示方向，支持 `right | left | auto`，auto 会自动判断右侧是否可以在窗口中展示，展示不下会在左侧展示'
            }
        ]
    }
];

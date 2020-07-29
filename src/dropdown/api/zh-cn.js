module.exports = [
    {
        type: 'directive',
        name: 'thyDropdown',
        description: '下拉菜单',
        properties: [
            {
                name: 'thyButton',
                description: `控制按钮的类型。详情参见 button 相关设置。`,
                type: 'string',
                default: ''
            },
            {
                name: 'thySize',
                description: `控制按钮的大小。使用的是 button 的 thySize。`,
                type: 'string',
                default: 'default'
            },
            {
                name: 'thyIcon',
                description: `显示的 icon。`,
                type: 'string',
                default: ''
            },
            {
                name: 'thyActionMenuToggle',
                description: `需要展示的弹窗 template。`,
                type: 'string',
                default: ''
            }
        ]
    }
];

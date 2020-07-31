module.exports = [
    {
        type: 'component',
        name: 'Transfer 参数列表',
        description: '用于设置列表的数据源,标题,移动状态以及自定义渲染以及回调函数',
        properties: [
            {
                type: 'ThyTransferItem[]',
                name: 'thyData',
                description: '数据源',
                default: ''
            },
            {
                type: 'string[]',
                name: 'thyTitles',
                description: 'title集合，title[0]为左标题,title[1]为右标题',
                default: ''
            },
            {
                type: 'boolean',
                name: 'thyAutoMove',
                description: '设置是否自动移动',
                default: 'true'
            },
            {
                type: 'boolean',
                name: 'thyLeftDraggable',
                description: '左侧列表是否拖动',
                default: ''
            },
            {
                type: 'boolean',
                name: 'thyRightDraggable',
                description: '右侧列表是否拖动',
                default: ''
            },
            {
                type: 'boolean',
                name: 'thyRightCanLock',
                description: '右侧列表是否可以锁定',
                default: ''
            },
            {
                type: 'number',
                name: 'thyRightLockMax',
                description: '右侧锁定最大数量',
                default: ''
            },
            {
                type: 'TemplateRef',
                name: '#renderTemplate',
                description: '设置自定义Item渲染数据模板',
                default: ''
            },
            {
                type: 'TemplateRef',
                name: '#renderLeftTemplate',
                description: '设置自定义左侧内容模版',
                default: ''
            },
            {
                type: 'TemplateRef',
                name: '#renderRightTemplate',
                description: '设置自定义右侧内容模版',
                default: ''
            },
            {
                type: 'ThyTransferChangeEvent',
                name: '(thyChange)',
                description: 'Transfer变化的回调事件',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'TransferItem 属性说明',
        description: '用于设置选项的标题,方向,选中状态以及自定义类型',
        properties: [
            {
                name: 'title',
                description: '数据标题',
                type: 'string',
                default: ''
            },
            {
                name: 'direction',
                description: '设置方向，可选值 [left,right]',
                type: 'string',
                default: ''
            },
            {
                name: 'checked',
                description: '选中状态',
                type: 'boolean',
                default: 'false'
            },
            {
                name: '[key:string]',
                description: '自定义数据',
                type: 'any',
                default: ''
            }
        ]
    },
    {
        type: 'component',
        name: 'TransferRenderContent 属性说明',
        description: '用于设置选项的标题,方向,选中状态以及自定义类型',
        properties: [
            {
                name: 'items',
                description: '分类后的数据',
                type: 'string',
                default: ''
            },
            {
                name: 'onSelectItem',
                description: '选择item',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'onUnselectItem',
                description: '取消选择item',
                type: 'any',
                default: ''
            }
        ]
    }
];

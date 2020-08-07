module.exports = [
    {
        type: 'component',
        name: 'thy-property-operation',
        properties: [
            {
                name: 'thyLabelText',
                description: '属性 Label',
                type: 'string',
                default: ''
            },
            {
                name: 'thyLabelTextTranslateKey',
                description: '属性 Label Translate Key',
                type: 'string',
                default: ''
            },
            {
                name: 'thyValue',
                description: '属性值',
                type: 'string',
                default: ''
            },
            {
                name: 'thyType',
                description: '属性类型, danger | primary | success | warning | null',
                type: 'string',
                default: 'null'
            },
            {
                name: 'thyIcon',
                description: '图标',
                type: 'string',
                default: ''
            },
            {
                name: 'thyActive',
                description: '激活状态',
                type: 'boolean',
                default: false
            },
            {
                name: 'thyShowClose',
                description: '当有属性值时是否展示移除图标',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyLabelHideWhenHasValue',
                description: '有值时隐藏 label',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyDisabled',
                description: '禁用操作，添加后property operation中thyClick和thyOnRemove事件将会被禁用',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyClick',
                description: 'property operation的点击事件回调',
                type: 'EventEmitter<Event>',
                default: 'null'
            },
            {
                name: 'thyOnRemove',
                description: 'property operation点击移除图标时的事件回调，此函数只有在thyShowClose为true时才会发生',
                type: 'EventEmitter',
                default: 'null'
            }
        ]
    }
];

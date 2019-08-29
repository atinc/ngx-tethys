export const apiParameters = [
    {
        property: 'thyLabelText',
        description: '属性 Label',
        type: 'string',
        default: ''
    },
    {
        property: 'thyLabelTextTranslateKey',
        description: '属性 Label Translate Key',
        type: 'string',
        default: ''
    },
    {
        property: 'thyValue',
        description: '属性值',
        type: 'string',
        default: ''
    },
    {
        property: 'thyType',
        description: '属性类型, danger | primary | success | warning | null',
        type: 'string',
        default: 'null'
    },
    {
        property: 'thyIcon',
        description: '图标',
        type: 'string',
        default: ''
    },
    {
        property: 'thyShowClose',
        description: '当有属性值时是否展示移除图标',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyLabelHasValue',
        description: '有值时展示 Label, deprecated',
        type: 'boolean',
        default: 'true'
    },
    {
        property: 'thyLabelHideWhenHasValue',
        description: '有值时隐藏 label, 取代之前的参数 thyLabelHasValue',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyDisabled',
        description: '禁用操作，添加后property operation中thyClick和thyOnRemove事件将会被禁用',
        type: 'boolean',
        default: 'false'
    },
    {
        property: 'thyClick',
        description: 'property operation的点击事件回调',
        type: 'Function',
        default: 'null'
    },
    {
        property: 'thyOnRemove',
        description: 'property operation点击移除图标时的事件回调，此函数只有在thyShowClose为true时才会发生',
        type: 'Function',
        default: 'null'
    }
];

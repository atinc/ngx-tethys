module.exports = [
    {
        type: 'component',
        name: 'thy-cascader',
        description: '级联选择菜单',
        properties: [
            {
                name: 'thyOptions',
                description: '数据项',
                type: 'array',
                default: ''
            },
            {
                name: 'ngModel',
                description: '当前选中值',
                type: 'array',
                default: ''
            },
            {
                name: 'ngModelChange',
                description: '点击事件',
                type: 'function',
                default: ''
            },
            {
                name: 'thyPlaceHolder',
                description: '默认值',
                type: 'string',
                default: ''
            },
            {
                name: 'disabled',
                description: '是否只读',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thySize',
                description: '控制大小（3种），lg、sm、xs',
                type: 'string',
                default: ''
            },
            {
                name: 'thyTriggerAction',
                description: '控制触发状态、hover',
                type: 'string',
                default: ''
            },
            {
                name: 'thyChangeOnSelect',
                description: '点击项，表单是否动态展示数据项',
                type: 'boolean',
                default: ''
            },
            {
                name: 'thyExpandTriggerAction',
                description: '鼠标经过下方列表项时，是否自动展开列表',
                type: 'boolean',
                default: ''
            }
        ]
    }
];

module.exports = [
    {
        type: 'component',
        name: 'thy-slider 参数列表',
        description: '用于滑动输入区间值等',
        properties: [
            {
                name: 'thyMax',
                description: 'slider 的最大值',
                type: 'number',
                default: 100
            },
            {
                name: 'thyMin',
                description: 'slider 的最小值',
                type: 'number',
                default: '0'
            },
            {
                name: 'thyStep',
                description: 'slider 的步长，需要被 thyMax - thyMin 的差值整除。',
                type: 'number',
                default: 1
            },
            {
                name: 'thyDisabled',
                description: '禁用 slider',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyVertical',
                description: '切换 slider 为纵轴模式',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'thyType',
                description: '切换 slider 的主题类型，支持',
                type: 'primary | success | info | warning | danger',
                default: 'success'
            },
            {
                name: 'thyColor',
                description: '通过变量设置 slider 的颜色',
                type: 'string',
                default: ''
            },
            {
                name: 'ngModel',
                description: '双向绑定的值',
                type: 'number',
                default: ''
            },
            {
                name: 'ngModelChange',
                description:
                    '当 slider 的值发生改变时，会触发 ngModelChange 事件，并把改变后的值作为参数传入。如果要获取移动结束后的事件回调，请使用 thyAfterChange',
                type: 'Event',
                default: ''
            },
            {
                name: 'thyAfterChange',
                description: '移动结束后的回调,参数为当前值。',
                type: 'Event',
                default: ''
            }
        ]
    }
];

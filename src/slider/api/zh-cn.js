module.exports = [
    {
        type: 'component',
        name: 'Thy-slider 参数列表',
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
                default: 0
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
                name: 'ngModel',
                description: '双向绑定的值',
                type: 'number',
                default: ''
            },
            {
                name: 'thyDragEnded',
                description: '移动结束后的回调,参数为当前值。',
                type: 'Event',
                default: ''
            }
        ]
    }
];

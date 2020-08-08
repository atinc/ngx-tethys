module.exports = [
    {
        type: 'component',
        name: 'thy-strength',
        description: '程度展示',
        properties: [
            {
                name: 'ngModel',
                description: '表示程度的值。共分为 1、2、3、4 四个程度。',
                type: 'number',
                default: ''
            },
            {
                name: 'titleKey',
                description: '组件标题，描述程度所指类型。',
                type: 'string',
                default: ''
            },
            {
                name: 'highestKey',
                description: '程度最高值文本。',
                type: 'string',
                default: '最高'
            },
            {
                name: 'highKey',
                description: '程度为高值时展示的文本。',
                type: 'string',
                default: '高'
            },
            {
                name: 'averageKey',
                description: '程度为中值时展示的文本。',
                type: 'string',
                default: '中'
            },
            {
                name: 'lowKey',
                description: '程度为低值时展示的文本。',
                type: 'string',
                default: '低'
            }
        ]
    }
];

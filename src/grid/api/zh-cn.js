module.exports = [
    {
        type: 'directive',
        name: 'thyRow',
        properties: [
            {
                name: 'thyGutter',
                description: '栅格间隔',
                type: 'number',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyCol',
        properties: [
            {
                name: 'thySpan',
                description: '栅格占位格数',
                type: 'number',
                default: ''
            }
        ]
    }
];

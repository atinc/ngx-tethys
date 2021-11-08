module.exports = [
    {
        type: 'component',
        name: 'thy-result',
        description: '结果页',
        properties: [
            {
                name: 'thyTitle',
                type: 'string',
                default: '-',
                description: 'result title'
            },
            {
                name: 'thySubtitle',
                type: 'string',
                default: '-',
                description: 'result subtitle'
            },
            {
                name: 'thyStatus',
                type: 'string',
                default: '-',
                description: `result status，状态为\`'success' | 'warning' | 'error'\``
            },
            {
                name: 'thyIcon',
                type: 'string',
                default: '-',
                description: 'result icon url'
            },
            {
                name: 'thyExtra',
                type: 'template',
                default: '-',
                description: 'result extra template'
            }
        ]
    }
];

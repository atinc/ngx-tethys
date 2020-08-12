module.exports = [
    {
        type: 'component',
        name: 'thy-stepper',
        properties: [
            {
                name: 'thySelectedIndex',
                description: '激活的index',
                type: 'number',
                default: '0'
            },
            {
                name: 'thyShowStepHeader',
                description: '是否展示步骤条导航',
                type: 'boolean',
                default: true
            }
        ]
    },
    {
        type: 'component',
        name: 'thy-step',
        properties: [
            {
                name: 'label',
                description: '步骤label',
                type: 'string',
                default: ''
            }
        ]
    }
];

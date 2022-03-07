module.exports = [
    {
        type: 'component',
        name: 'thy-stepper',
        properties: [
            {
                name: 'thySelectedIndex',
                description: '当前处于激活状态的步骤index',
                type: 'number',
                default: '0'
            },
            {
                name: 'thyShowStepHeader',
                description: '步骤条导航是否展示，默认展示',
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
                name: 'thyLabel',
                description: '步骤条中每个步骤的label文本',
                type: 'string',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyStepperPrevious',
        properties: [
            {
                name: 'thyStepperPrevious',
                description: '从当前步骤切换至上一步',
                type: 'directive',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyStepperNext',
        properties: [
            {
                name: 'thyStepperNext',
                description: '从当前步骤切换至下一步',
                type: 'directive',
                default: ''
            }
        ]
    }
];

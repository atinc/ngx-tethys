export const apiParameters = [
    {
        property: 'thyTitle',
        description: 'result title',
        type: 'string',
        default: ''
    },
    {
        property: 'thySubtitle',
        description: 'result subtitle',
        type: 'string',
        default: ''
    },
    {
        property: 'thyType',
        description: 'result type',
        type: '"success" | "warning" | "fail"',
        default: ''
    },
    {
        property: 'thySrc',
        description: 'result icon url',
        type: 'string',
        default: ''
    },
    {
        property: 'thyExtra',
        description: 'result extra template',
        type: 'template',
        default: ''
    }
];

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
        property: 'thyStatus',
        description: 'result status',
        type: '"success" | "warning" | "error"',
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

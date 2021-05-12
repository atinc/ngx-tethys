module.exports = [
    {
        type: 'component',
        name: 'thy-alert',
        description: 'Show alert messages',
        properties: [
            {
                name: 'thyType',
                description: 'Alert type',
                type: `'success' | 'warning' | 'danger' | 'info' | 'primary-weak' | 
                'success-weak' | 'warning-weak' | 'danger-weak'`,
                default: 'info'
            },
            {
                name: 'thyMessage',
                description: 'Show alert message',
                type: 'string',
                default: ''
            },
            {
                name: 'thyIcon',
                description:
                    'Show custom icon. Pass true or false to controls whether to show icons, or pass a string to specify the icon name.',
                type: 'boolean | string',
                default: ''
            },
            {
                name: 'thyCloseable',
                description: 'Whether Alert can be closed, it is not displayed by default',
                type: 'boolean',
                default: 'false'
            },
            {
                name: 'operation',
                description: 'Custom action',
                type: 'ContentChild<TemplateRef>',
                default: ''
            }
        ]
    },
    {
        type: 'directive',
        name: 'thyAlertActionItem',
        description: 'Style Directive. Add custom action styles for alert content.',
        properties: []
    }
];

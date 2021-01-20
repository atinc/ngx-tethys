module.exports = [
    {
        type: 'service',
        name: 'thy-guider',
        description: 'Guider 服务',
        properties: [
            {
                name: 'config',
                description: 'Guider 的配置项',
                type: 'ThyGuiderConfig',
                default: ''
            }
        ]
    }
];

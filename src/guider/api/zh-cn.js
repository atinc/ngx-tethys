module.exports = [
    {
        type: 'service',
        name: 'thy-guider',
        description: 'Guider 服务',
        properties: [
            {
                name: 'option',
                description: 'Guider 的配置项',
                type: 'ThyGuiderConfig',
                default: ''
            }
        ]
    }
];
